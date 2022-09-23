import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Row>
            <Col className="text-center">
              <span>Copyright &copy; Soumallya</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
