const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        
        const products = await Product.findAll({ page, limit, search });
        const total = await Product.count(search);
        const totalPages = Math.ceil(total / limit);
        
        res.status(200).json({
            success: true,
            count: products.length,
            page,
            totalPages,
            totalProducts: total,
            data: products
        });
    } catch (err) {
        next(err);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, image, stock } = req.body;
        
        const productId = await Product.create({ name, description, price, image, stock });
        const product = await Product.findById(productId);
        
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, image, stock } = req.body;
        
        await Product.update(req.params.id, { name, description, price, image, stock });
        const product = await Product.findById(req.params.id);
        
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.delete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};