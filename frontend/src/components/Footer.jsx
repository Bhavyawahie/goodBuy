import React from 'react'
import { Container,Image, Row, Col, ListGroup } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import logo_white_new from '../logo_white_new.png'

const Footer = () => {
    return (
        <footer style={{backgroundColor: "#253544"}} className='mt-4'>
            <Container className='py-5 px-6'>
                <Row className="footer-container">
                    <Col xs={10} sm={6} md={4} lg={4} xl={4}>
                        <Image src={logo_white_new} 
                                className='img-fluid footer-logo'   
                                width="160"
                                height="90"
                                />
                        <p className='text-muted'>65 A, Arjun Nagar, Behind B6 Market, Safdarjung Enclave, <br/> Delhi-110029</p>        
                        <p className='text-muted'>CIN: KC52100TQ5L0PJ025D3ZC</p>
                    </Col>
                    <Col xs={8} sm={4} md={3} lg={2} xl={2} className="pt-3">
                        <p className='h4 footer-section-heading'>Top Selling</p>
                        <ul className='footer-section-list mt-3'>
                            <li><Link to="/product/6133a7c6e6c77b5600b14402">Legion 5 Pro</Link></li>
                            <li><Link to="/product/6130e320e8500843fc372c74">Pixel 4A</Link></li>
                            <li><Link to="/product/612d4a45165dbe19a870ba34">iPhone 11 Pro</Link></li>
                            <li><Link to="/product/62c5cac36f4bc93be80c7ce4">O General 1.5 Ton AC</Link></li>
                            <li><Link to="/product/612d4a45165dbe19a870ba35">Canon EOS 80D DSLR</Link></li>
                            
                        </ul>
                    </Col>
                    <Col xs={7} sm={6} md={5} lg={4} xl={4} className="pt-3">
                    <p className='h4 footer-section-heading'>Contact Us</p>
                        <ul className='footer-section-list socials'>
                            <li><Link to={{pathname:"https://www.facebook.com/bhavyawahie"}} target="_blank"><i className="fa-brands fa-facebook"></i></Link></li>
                            <li><Link to={{pathname:"https://www.instagram.com/bhavyawahie"}} target="_blank"><i className="fa-brands fa-instagram"></i></Link></li>
                            <li><Link to={{pathname:"https://www.twitter.com/bhavyawahie"}} target="_blank"><i className="fa-brands fa-twitter"></i></Link></li>
                            <li><Link to={{pathname:"https://www.linkedin.com/in/bhavyawahie"}} target="_blank"><i className="fa-brands fa-linkedin"></i></Link></li>
                            <li><Link to={{pathname:"https://www.github.com/bhavyawahie"}} target="_blank"><i className="fa-brands fa-github"></i></Link></li>
                            
                        </ul>
                    </Col>
                    <Col xs={6} md={3} lg={2} xl={2} className='pt-4 d-flex justify-content-center' >
                        <a href="https://razorpay.com/" target="_blank"><img referrerpolicy="origin" src = "https://badges.razorpay.com/badge-light.png " style = {{height: "83px",borderRadius: "7px"}} alt = "Razorpay | Payment Gateway | Neobank"/></a>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col lg={12} md={12} sm={12} xs={12} className='text-justify text-center text-muted'>
                            {`Copyright © GoodBuy ${new Date().getFullYear()}`} 
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
