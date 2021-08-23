import React, { useEffect } from 'react'
import { Button, Row, Col , ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    if(!loading){
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])


    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : <>
        
            <h3>Order: </h3>
            <h6><em>{order._id}</em></h6>
        <Row className='pt-4'>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Shipping</h4>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>    
                            <p>
                            <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p><strong>Address:</strong> {order.shippingAddress.address} ,{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pincode}</p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>: <Message variant='danger'>Not Delivered yet!</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Payment Method</h4>
                            <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                            </p> 
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>: <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4>Order Items</h4>
                            {order.orderItems.length === 0 ? <Message>Orders are empty!</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} rounded fluid/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card className='px-3'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>₹ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>GST</Col>
                                    <Col>₹ {order.taxPrice} <em>(inclusive)</em></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>₹ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-bottom-0'>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹ {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-bottom-0'>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
