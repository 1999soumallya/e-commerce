import React, { useEffect } from "react";
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import { listProducts } from "../Actions/ProductActions";
import DnaLoader from "../Shared/Loaders/DnaLoader";
import ErrorAlert from "../Shared/Alerts/CustomAlert";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);

  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <>
      {
        loading ? <DnaLoader /> : error ? <ErrorAlert variant="danger" children={error} /> : (
          <Row>
            {products.map((products) => (
              <Col key={products._id} md={3}>
                <ProductScreen products={products} />
              </Col>
            ))}
          </Row>
        )
      }
    </>
  );
};

export default HomeScreen;
