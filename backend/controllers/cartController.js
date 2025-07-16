const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOrCreateCart(req.user.id);
        const items = await Cart.getCartItems(cart.id);
        
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        next(err);
    }
};

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        const cart = await Cart.findOrCreateCart(req.user.id);
        await Cart.addItem(cart.id, productId, quantity);
        const items = await Cart.getCartItems(cart.id);
        
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        next(err);
    }
};

exports.updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        const cart = await Cart.findOrCreateCart(req.user.id);
        await Cart.updateItem(cart.id, productId, quantity);
        const items = await Cart.getCartItems(cart.id);
        
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        next(err);
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        
        const cart = await Cart.findOrCreateCart(req.user.id);
        await Cart.removeItem(cart.id, productId);
        const items = await Cart.getCartItems(cart.id);
        
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        next(err);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOrCreateCart(req.user.id);
        await Cart.clearCart(cart.id);
        
        res.status(200).json({ success: true, data: [] });
    } catch (err) {
        next(err);
    }
};