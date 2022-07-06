const express = require('express');
const router = express.Router();
const { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, uploadProductImage} = require('../controllers/productController')
const { protect, admin } = require('../middlewares/authMiddleware')

router
    .route("/")
    .get(getProducts)
    .post(protect, admin, createProduct)

router
    .route('/:id/reviews')
    .post(protect, createProductReview) 
    
router
    .route("/:id")
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)

router
    .route("/:id/image/upload")
    .post(protect, uploadProductImage)    

module.exports = router;