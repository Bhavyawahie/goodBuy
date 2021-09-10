import React, { useEffect } from 'react'
import axios from 'axios'
import { Button, Row, Col , ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../logo.png'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

let options
const OrderScreen = ({match, history}) => {
    const getApi = async () => {
        const {data} = await axios.get('/api/config/razorpay')
        options = {
            "key": data 
        }
    }
    getApi()
    const orderId = match.params.id
    const dispatch = useDispatch()
    // const [sdkReady, setSdkReady] = useState(false)
    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
    if(!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }

    useEffect(() => {
        if(!userInfo) {
            history.push(`/login`)
        }
        const addRazorpayScript = () => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.type = 'text/javascript'
        script.async = true 
        
        document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver ||  order._id !== orderId ) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
            } else if (!order.isPaid) {
            if (!window.Razorpay) {
                addRazorpayScript()
            }
        }    
    }, [history, dispatch, orderId, successPay, order, userInfo, successDeliver])

    const paymentHandler = (paymentId) => {
        const paymentResult = {
                id : paymentId,
                status: "COMPLETED",
                update_time: Date.now(),
                email_address: order.user.email
        }
        dispatch(payOrder(orderId, paymentResult))
    } 

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const setOptions = () => {
        return new Promise ((resolve) => {
            resolve(options = {
                ...options,
                amount: order.totalPrice * 100 , //  = INR 1
                name: 'GoodBuy',
                description: 'Expert service. Unbeatable price.',
                image: logo,
                "handler" : (response) => {
                    paymentHandler(response.razorpay_payment_id)
                },
                prefill: {
                    name: order.user.name,
                    email: order.user.email
                },
                notes: {
                    address: order.shippingAddress.address + ", " + order.shippingAddress.city + ", " + order.shippingAddress.state + ", " + order.shippingAddress.pincode 
                },
                theme: {
                    color: '#F9D328',
                    hide_topbar: false
                }
            })
        })
    }
    
    const openPayModal = async () => {
        await setOptions()
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }


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
                            <p><strong>Address:</strong> {order.shippingAddress.address} , {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pincode}</p>
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
                            {!order.isPaid && (
                            <ListGroup.Item className='border-bottom-0 d-grid'>
                            {loadingPay && <Loader />}
                                <Button onClick={openPayModal}>Pay Now!</Button>
                            </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader/>}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item className="d-grid">
                                    <Button type='button' className='btn btn-block' onClick={deliverHandler}>Mark as Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
