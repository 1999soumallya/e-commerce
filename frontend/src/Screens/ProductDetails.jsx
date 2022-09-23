import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Image, ListGroupItem, Form, Card } from "react-bootstrap";
import Rating from "../Components/Rating";
import { Link } from "react-router-dom";
import { singleProductDetails } from "../Actions/SingleProduct";
import MagnifineLoader from "../Shared/Loaders/MagnifineLoader";
import ErrorAlert from '../Shared/Alerts/CustomAlert'

// ({ match }) called dstructure

const ProductDetails = ({history, match }) => {

  const [Qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const singleproductdetails = useSelector(state => state.singleproduct)

  const { loading, SingleProduct, error } = singleproductdetails

  useEffect(() => {
    dispatch(singleProductDetails(match.params.id))
  }, [dispatch, match.params.id]);

  const addToChartHandler = () => {
    history.push(`/cart/${match.params.id}?Qty=${Qty}`)
  }

  return (
    <>
      {
        loading ? <MagnifineLoader /> : error ? <ErrorAlert variant="danger" children={error} /> : (
          <>
            <Link to="/" className="btn btn-light">
              <i className="fas fa-arrow-left    "></i>
              &nbsp; GO BACK
            </Link>
            <Row>
              <Col md={6}>
                <Image src={SingleProduct.image} alt={SingleProduct.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h3>{SingleProduct.name}</h3>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Rating value={SingleProduct.rating} text={`${SingleProduct.numReviews} Reviews`} />
                  </ListGroupItem>
                  <ListGroupItem>Price : ${SingleProduct.price}</ListGroupItem>
                  <ListGroupItem>{SingleProduct.description}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card style={{ width: '22rem' }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          {SingleProduct.countInStock > 0 ? "In Stock " : "out of stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {SingleProduct.countInStock > 0 && (
                        <Row>
                          <Col>Quantity :</Col>
                          <Col>
                            <Form.Control as={"select"} value={Qty} onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(SingleProduct.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Button className="btn-block" type="button" onClick={addToChartHandler}>
                            Add to cart
                          </Button>
                        </Col>
                        <Col>
                          <Button className="btn-block" type="button">
                            Buy Now
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      }
    </>
  );
};

export default ProductDetails;
