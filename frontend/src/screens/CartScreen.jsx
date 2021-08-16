import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Button, Form, FormControl, NavItem, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions' 

const CartScreen = ({ history, location, match }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    return (
        <Row>
            <Col md={8}>
                <h1 className="mb-4 mt-2">My Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/"><em>Go back</em></Link></Message> : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={4} className="pt-4">
                                        <Link to={`products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2} className="pt-4">₹{item.price}</Col>
                                    <Col md={2} className="pt-4">
                                        <FormControl as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                        {
                                                            [...Array(item.countInStock).keys()].map(x => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))
                                                        }
                                        </FormControl>
                                    </Col>
                                    <Col md={2} className="pt-4">
                                        <Button type='button' className='btn btn-danger' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-times'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)}) Items</h3>
                            <h5><em>₹ {cartItems.reduce((acc, currItem) => acc + currItem.qty * currItem.price, 0)}</em></h5>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-grid">
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>    
            </Col>
        </Row>
    )
}

export default CartScreen
