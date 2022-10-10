import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { cartAction, cartRemoveAction } from '../Actions/CartActions'
import ErrorAlert from '../Shared/Alerts/CustomAlert'

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id
    const Qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(cartAction(productId, Qty))
        }
    }, [dispatch, productId, Qty])

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    // console.log( Object.entries(cartItems).length);
    const removeFromCartHandler = (id) => {
        dispatch(cartRemoveAction(id));
    }

    const checkout = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <h1> Shopping Cart </h1>
                    {
                        cartItems.length === 0 ? (
                            <ErrorAlert>
                                Your Cart is Empty! <Link to={"/"}>Go Back</Link>
                            </ErrorAlert>
                        ) : (
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map(item => (
                                        <ListGroupItem key={item.product}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={3}>
                                                    <Row>
                                                        <Col>
                                                            <Form.Control as={"select"} value={item.Qty} onChange={(e) => dispatch(cartAction(item.product, Number(e.target.value)))}>
                                                                {
                                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                        <Col>
                                                            <Button type='button' className='deleteButton' variant='danger' size='sm' onClick={() => removeFromCartHandler(item.product)}>
                                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))
                                }
                            </ListGroup>
                        )
                    }
                </Col>
                <Col md={4} style={{ paddingTop: "48px" }}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.Qty, 0)}) items</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <h3>Total Price (${cartItems.reduce((acc, item) => acc + item.Qty * item.price, 0).toFixed(2)}) </h3>
                            </ListGroupItem>
                            <Button type='button' className='btn btn-block' disabled={cartItems.length === 0} onClick={checkout}>
                                Process To Checkout
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen