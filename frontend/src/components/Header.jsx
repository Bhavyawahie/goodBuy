import React from 'react'
import {LinkContainer} from 'react-router-bootstrap';
import {Container, Navbar, Nav} from 'react-bootstrap'
import logo from "../logo.png"

const Header = () => {
    return (
        <header>
            <Navbar variant="light" bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img alt="bestbuylogo"
                                src={logo}
                                width="80"
                                height="45"
                                className="d-inline-block align-top"/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    {"  "}Cart
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>
                                    {"  "}Sign in
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
