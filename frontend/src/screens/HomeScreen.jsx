import React, { useState, useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
// import products from "../products"
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const res =  await axios.get("/api/products")
            setProducts(res.data)
        }
        
        getProducts()
    }, []);

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
