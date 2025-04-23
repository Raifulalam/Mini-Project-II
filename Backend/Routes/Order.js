const express = require('express');
const router = express.Router();
const Order = require('../Model/Order');

// @route   POST /api/orders
// @desc    Create a new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// @route   GET /api/orders
// @desc    Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('items.itemId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/orders/user/:userId
// @desc    Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await Order.find({ user: userId }).populate('user').populate('items.itemId');
        if (orders.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/orders/:id
// @desc    Get a specific order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('items.itemId');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   PUT /api/orders/:id
// @desc    Update order status or details
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// @route   DELETE /api/orders/:id
// @desc    Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
