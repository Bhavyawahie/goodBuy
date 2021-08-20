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

module.exports = {
    addOrderItems
}
