import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserDetailsAction, UserLogout } from "../Actions/UserAction";

const Header = () => {
  const [username, setusername] = useState("SignIn");

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetails);

  const { UserDetails } = userDetail;

  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (userInfo) {
      dispatch(UserDetailsAction());
      setusername(UserDetails.name);
    }
  }, [userInfo, dispatch]);

  const logoutHandler = () => {
    dispatch(UserLogout());
    setusername("SignIn");
    window.location.reload(false);
  };

  return (
    <Navbar
      bg="dark"
      expand="lg"
      variant="dark"
      collapseOnSelect
      style={{ height: "57px" }}
    >
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
            {localStorage.getItem("userInfo") ? (
              <NavDropdown title={username} id="Username">
                <LinkContainer to={"/profile"}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to={"/signin"}>
                <Nav.Link href="#link">
                  <i className="fas fa-user"></i>
                  &nbsp;{username}
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
