import React, { useEffect} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {listProducts} from '../actions/productActions';
// import products from "../products"
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword]);


    return (
        <>
            <h2 className="py-3">Latest Products</h2>
            {
            loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Row> {
                    products.map(product => (
                        <Col sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                            key={
                                product._id
                        }>
                            <Product productContent={product}/>
                        </Col>
                    ))
                } </Row>
            )
        } </>
    )
}

export default HomeScreen
