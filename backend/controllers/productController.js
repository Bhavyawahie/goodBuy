const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')


//  @desc    Fetch all products
//  @route   GET /api/products
//  @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products)
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

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}