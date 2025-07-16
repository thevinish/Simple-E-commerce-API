const pool = require('../config/db');

const Cart = {
    async findOrCreateCart(userId) {
        let [rows] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        
        if (rows.length === 0) {
            const [result] = await pool.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
            return { id: result.insertId, user_id: userId };
        }
        
        return rows[0];
    },

    async getCartItems(cartId) {
        const [rows] = await pool.query(
            'SELECT ci.*, p.name, p.price, p.description FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?',
            [cartId]
        );
        return rows;
    },

    async addItem(cartId, productId, quantity = 1) {
        // Check if item already exists in cart
        const [existing] = await pool.query(
            'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );
        
        if (existing.length > 0) {
            const newQuantity = existing[0].quantity + quantity;
            await pool.query(
                'UPDATE cart_items SET quantity = ? WHERE id = ?',
                [newQuantity, existing[0].id]
            );
            return existing[0].id;
        } else {
            const [result] = await pool.query(
                'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
                [cartId, productId, quantity]
            );
            return result.insertId;
        }
    },

    async updateItem(cartId, productId, quantity) {
        await pool.query(
            'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
            [quantity, cartId, productId]
        );
    },

    async removeItem(cartId, productId) {
        await pool.query(
            'DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );
    },

    async clearCart(cartId) {
        await pool.query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    }
};

module.exports = Cart; 