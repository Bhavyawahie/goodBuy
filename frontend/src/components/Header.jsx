import React from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap'
import logo from "../logo.png"

const Header = () => {
    return (
        <header>
            <Navbar variant="light" bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">
                    <img alt="bestbuylogo" src={logo} width="80" height="45" className="d-inline-block align-top"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                {"  "}Cart</Nav.Link>
                            <Nav.Link href="/login">
                                <i className="fas fa-user"></i>{"  "}Sign in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
