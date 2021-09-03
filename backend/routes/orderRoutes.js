const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders } = require('../controllers/orderController')
const { protect, admin } = require('../middlewares/authMiddleware')

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)


module.exports = router;