const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel')


// @desc    Create new order
// @route   POST /api/orders
// @access  Protected

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.lenght === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }

})

// @desc    Get order by ID 
// @route   GET /api/orders/:id
// @access  Protected

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order) {
        res.json(order)
    }
    else {
        res.status(404)
        throw new Error('Order Not Found!')
    }
})

// @desc    update isPaid status of the order by it's Id 
// @route   PUT /api/orders/:id/pay
// @access  Protected


const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found!')
    }
})

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
}
