import React from 'react'
import { Card } from 'react-bootstrap'

const Product = ({ productContent }) => {
    return (
        <Card classname="my-3 p-3 rounded">
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
                    <div className="my-3">
                        {productContent.rating} from {productContent.numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text as="h3">₹{productContent.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
