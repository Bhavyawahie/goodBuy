import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, FormControl, Form } from 'react-bootstrap'
import Meta from '../components/Meta'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants' 

const ProductScreen = ({ history, match }) => {
    const [ qty, setQty ] = useState(1)
    const [ rating, setRating ] = useState(0)
    const [ comment, setComment ] = useState("")

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)  //accessing the redux state through store via reducers
    const {loading, error, product} = productDetails
    
    const productReviewCreate = useSelector(state => state.productReviewCreate)  //accessing the redux state through store via reducers
    const { loading: loadingProductReview, success: successProductReview, error: errorProductReview } = productReviewCreate
    
    const userLogin = useSelector(state => state.userLogin)  //accessing the redux state through store via reducers
    const { userInfo } = userLogin

    useEffect(() => {
        if(successProductReview){
            setRating(0)
            setComment("") 
        }
        dispatch(listProductDetails(match.params.id))
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }, [dispatch, match, successProductReview, product._id])

    const addTooCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, 
            comment
        }))
    }

    return (
        <>  
            <Link to="/" className="btn btn-outline-secondary my-3">
                <i className="fas fa-chevron-left"></i>
            </Link>
            {
            loading ? <Loader/>: error ? <Message>{error}</Message> : (
            <>    
                <Meta title={product.name}/>
                <Row className="mb-4">
                    <Col md={5}
                        className="p-5">
                        <Image src={
                                product.image
                            }
                            alt={
                                product.name
                            }
                            className="img-fluid"
                            fluid></Image>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="py-3 border-0">
                                <h2>{
                                    product.name
                                }</h2>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3 border-0">
                                <Rating value={product.rating}text={`${product.numReviews} reviews`}/>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-1.5 border-0">
                                <h4>₹ {product.price}</h4>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3">Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}
                        className="px-2 py-3">
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Price:
                                            </strong>
                                        </Col>
                                        <Col>
                                            ₹ {
                                            product.price
                                        } </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>Status</strong>
                                        </Col>
                                        <Col> {
                                            product.countInStock > 0 ? "In Stock" : "Out of Stock"
                                        } </Col>
                                    </Row>
                                </ListGroup.Item>
                                { product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>Quantity</strong></Col>
                                            <Col>
                                                <FormControl as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) }
                                <ListGroup.Item className="d-grid">
                                    <Button className="btn-block btn-warning" type="button" onClick={addTooCartHandler}
                                        disabled={
                                            product.countInStock === 0
                                    }>Add to Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={5}></Col>
                    <Col md={7} className="p-4">
                        {product.reviews.length === 0 && <Message variant='light'>No reviews</Message>}
                        <ListGroup variant='primary'>
                            <ListGroup.Item>
                                <h3>Write a Customer Review</h3>
                                { successProductReview && (
                                    <Message variant='success'>
                                        Review submitted successfully
                                    </Message>)
                                }
                                { loadingProductReview && <Loader /> }
                                { errorProductReview && <Message variant='danger'>{errorProductReview}</Message> }
                                { userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control as='select' value={rating} onChange={ (e) => setRating(e.target.value)}>
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment} onChange={ (e) => setComment(e.target.value)}></Form.Control>
                                        </Form.Group>
                                        <Button disabled={loadingProductReview} type='submit' variant='primary' className='my-3'>Submit</Button>
                                    </Form>) : (
                                    <Message variant='primary'> To write a review <Link to='/login'>Sign in!</Link></Message>
                                )}
                                <h3>Reviews</h3>
                                {product.reviews.map( review => (
                                <ListGroup.Item key={review._id} className='border-0'> 
                                        <strong>{review.name}</strong> 
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>
            )
        } </>
    )
}

export default ProductScreen// <Carousel>// {//     product.image.map((i, index) => (//         <Carousel.Item>//             <Image key={index} src={i} alt={product.name} ClassName="img-fluid" fluid></Image>//         </Carousel.Item>//     ))// }// </Carousel>
