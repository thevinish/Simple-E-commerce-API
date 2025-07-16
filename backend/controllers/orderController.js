const Order = require('../models/order');
const Cart = require('../models/cart');

exports.createOrder = async (req, res, next) => {
    try {
        const cart = await Cart.findOrCreateCart(req.user.id);
        const cartItems = await Cart.getCartItems(cart.id);
        
        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        
        const orderId = await Order.create(req.user.id, cartItems);
        await Cart.clearCart(cart.id);
        
        const order = await Order.findById(orderId);
        
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.findByUser(req.user.id);
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        
        // Check if user is admin or the order belongs to them
        if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to access this order' 
            });
        }
        
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};