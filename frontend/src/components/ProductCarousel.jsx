import React  from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import banner1 from '../banner1.png'
import banner2 from '../banner2.png'
import banner3 from '../banner3.png'


const ProductCarousel = () => {
    return (
        <Carousel pause='hover' touch className='d-flex justify-content-center' xs={12}>
                <Carousel.Item>
                    <Link to={`/product/612d4a45165dbe19a870ba33`}>
                        <Image src={banner1} alt={"apple airpods"} fluid />
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={`/product/612d4a45165dbe19a870ba36`}>
                        <Image src={banner3} alt={"sony playstation"} fluid/>
                    </Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to={`/product/6133a7d2e6c77b5600b1440c`}>
                        <Image src={banner2} alt={"bata hawai chappal"} fluid/>
                    </Link>
                </Carousel.Item>
        </Carousel>
)}

export default ProductCarousel
