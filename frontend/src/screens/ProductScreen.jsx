import React from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, ListGroup, Image, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'


const ProductScreen = ({ match }) => {
    const product = products.find(p => p._id === match.params.id)
    return (
        <>
                <Link to="/" className="btn btn-outline-secondary my-3"><i class="fas fa-chevron-left"></i></Link>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} ClassName="img-fluid" fluid></Image>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="py-3">
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3"><Rating value={product.rating} text={`${product.numReviews} reviews` }/></ListGroup.Item>
                            <ListGroup.Item className="py-1.5">Price: ₹ {product.price}</ListGroup.Item>
                            <ListGroup.Item className="py-3">Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            <strong>Price: </strong>
                                        </Col>
                                        <Col>
                                        ₹ {product.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            <strong>Status</strong>
                                        </Col>
                                        <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem className="d-grid">
                                    <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
        </>
    )
}

export default ProductScreen
