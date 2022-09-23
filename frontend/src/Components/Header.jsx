import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserDetailsAction } from "../Actions/UserAction"

const Header = () => {

  const dispatch = useDispatch();

  if (localStorage.getItem('userInfo')) {
    dispatch(UserDetailsAction());
  }


  return (
    <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect style={{ height: "57px" }}>
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>Online Shop</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: "auto" }}>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
                &nbsp; chart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/signin"}>
              <Nav.Link href="#link">
                <i className="fas fa-user"></i>
                &nbsp; SignIn
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
