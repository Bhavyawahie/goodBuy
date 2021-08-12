import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem, Carousel, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetails} from '../actions/productActions'
import {productDetailsReducer} from '../reducers/productReducers'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
    const [ qty, setQty ] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)  //accessing the redux state through store via reducers
    const {loading, error, product} = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.params.id))  //action getting dispatched
    }, [dispatch, match])

    const addTooCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link to="/" className="btn btn-outline-secondary my-3">
                <i class="fas fa-chevron-left"></i>
            </Link>
            {
            loading ? <Loader/>: error ? <Message>{error}</Message> : (
                <Row>
                    <Col md={5}
                        className="p-5">
                        <Image src={
                                product.image
                            }
                            alt={
                                product.name
                            }
                            ClassName="img-fluid"
                            fluid></Image>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="py-3 border-0">
                                <h2>{
                                    product.name
                                }</h2>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3 border-0"><Rating value={
                                        product.rating
                                    }
                                    text={
                                        `${
                                            product.numReviews
                                        } reviews`
                                    }/></ListGroup.Item>
                            <ListGroup.Item className="py-1.5 border-0">
                                <h4>₹ {
                                    product.price
                                }</h4>
                            </ListGroup.Item>
                            <ListGroup.Item className="py-3">Description: {
                                product.description
                            }</ListGroup.Item>
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
                                <ListGroupItem className="d-grid">
                                    <Button className="btn-block btn-warning" type="button" onClick={addTooCartHandler}
                                        disabled={
                                            product.countInStock === 0
                                    }>Add to Cart</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )
        } </>
    )
}

export default ProductScreen// <Carousel>// {//     product.image.map((i, index) => (//         <Carousel.Item>//             <Image key={index} src={i} alt={product.name} ClassName="img-fluid" fluid></Image>//         </Carousel.Item>//     ))// }// </Carousel>
