import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ productContent }) => {
    return (
        <Card className="my-3 rounded">
            <Link to={`/product/${productContent._id}`}>
                <Card.Img src={productContent.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${productContent._id}`}>
                    <Card.Title as="div">
                        <strong>{productContent.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={productContent.rating} text={`${productContent.numReviews} reviews`}/>
                </Card.Text>
                <Card.Text as="h3">₹{productContent.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
