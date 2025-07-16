const pool = require('../config/db');

const Order = {
    async create(userId, cartItems) {
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const [orderResult] = await pool.query(
            'INSERT INTO orders (user_id, total) VALUES (?, ?)',
            [userId, totalAmount]
        );
        const orderId = orderResult.insertId;
        
        // Add order items
        for (const item of cartItems) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );
        }
        
        return orderId;
    },

    async findByUser(userId) {
        const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC', [userId]);
        
        for (const order of orders) {
            const [items] = await pool.query(
                'SELECT oi.*, p.name, p.description FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
                [order.id]
            );
            order.items = items;
        }
        
        return orders;
    },

    async findAll() {
        const [orders] = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
        
        for (const order of orders) {
            const [items] = await pool.query(
                'SELECT oi.*, p.name, p.description FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
                [order.id]
            );
            order.items = items;
        }
        
        return orders;
    },

    async findById(orderId) {
        const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        if (orders.length === 0) return null;
        
        const order = orders[0];
        const [items] = await pool.query(
            'SELECT oi.*, p.name, p.description FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?',
            [order.id]
        );
        order.items = items;
        
        return order;
    }
};

module.exports = Order; 