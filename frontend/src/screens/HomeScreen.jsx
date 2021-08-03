import React from 'react'
import {Col, Row} from 'react-bootstrap'
import products from "../products"
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <>
            <h2 className="py-3">Latest Products</h2>
            <Row> {
                products.map(product => (
                    <Col sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                        key={product._id}>
                        <Product productContent={product} />
                    </Col>
                ))
            } </Row>
        </>
    )
}

export default HomeScreen
