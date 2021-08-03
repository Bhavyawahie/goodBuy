import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ productContent }) => {
    return (
        <Card className="my-3 rounded">
            <a href={`/product/${productContent._id}`}>
                <Card.Img src={productContent.image} variant="top"/>
            </a>
            <Card.Body>
                <a href={`/product/${productContent._id}`}>
                    <Card.Title as="div">
                        <strong>{productContent.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <Rating value={productContent.rating} text={`${productContent.numReviews} reviews`}/>
                </Card.Text>
                <Card.Text as="h3">₹{productContent.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
