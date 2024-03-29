const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { cloudinary } = require('../utils/cloudinarySetup');


//  @desc    Fetch all products
//  @route   GET /api/products
//  @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12 //(No. of products per page)
    const page = Number(req.query.pageNumber) || 1
    const category = decodeURIComponent(req.query.category)
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    if(category) {
        const count = await Product.countDocuments({category})
        const products = await Product.find({category}).limit(pageSize).skip(pageSize * (page-1))
        res.status(200).json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        const count = await Product.countDocuments ({...keyword})
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
        res.status(200).json({products, page, pages: Math.ceil(count/pageSize)})
    }

})


//  @desc    Fetch a product
//  @route   GET /api/products/:id
//  @access  Private (admin-only)

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.status(200).json(product)        
    } else {
        res.status(404).json( { message: 'Product not found!'} )
    }
})

//  @desc    Delete a product
//  @route   DELETE /api/products/:id
//  @access  Private (admin-only)

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        await Product.findByIdAndDelete(req.params.id)  
        res.json({message: "Product removed"})
    } else {
        res.status(404).json( { message: 'Product not found!'} )
    }
})

//  @desc    Create a product
//  @route   POST /api/products/
//  @access  Private (admin-only)

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpeg',
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum et aliquam id, aperiam quasi omnis repellendus quia sunt, ipsum animi temporibus, libero ex harum quidem pariatur voluptas impedit. Corrupti, praesentium."
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//  @desc    Upload an image to cloudinary via backend for product updation
//  @route   POST /api/products/:id/image/upload
//  @access  Private

const uploadProductImage = asyncHandler(async (req, res) => {
    const productId = req.params.id
    const image = req.body.image
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'goodBuyStore',
            public_id: `IMG-${productId}-${Date.now()}`
        })
        if(uploadResponse){
            res.status(200).json(uploadResponse.url)
        } 
        else{
            res.status(400)
            throw new Error('Upload a correct Image file')
        }
    }
})


//  @desc    Update a product
//  @route   PUT /api/products/:id
//  @access  Private (admin-only)

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock} = req.body
    const product = await Product.findById(req.params.id)
    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//  @desc    Create a new Review
//  @route   POST /api/products/:id/reviews
//  @access  Private

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if(product) {
        const alreadyReviewed = product.reviews.find( (review) => review.user.toString() === req.user._id.toString())
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed!')
        }

        const review =  {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added' })
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    uploadProductImage,
    updateProduct,
    createProductReview,
}