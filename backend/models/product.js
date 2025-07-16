const pool = require('../config/db');

const Product = {
    async create({ name, description, price, image, stock }) {
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, image, stock]
        );
        return result.insertId;
    },

    async findAll({ page = 1, limit = 10, search = '' }) {
        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM products';
        let params = [];
        
        if (search) {
            query += ' WHERE name LIKE ? OR description LIKE ?';
            params = [`%${search}%`, `%${search}%`];
        }
        
        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);
        
        const [rows] = await pool.query(query, params);
        return rows;
    },

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    },

    async update(id, { name, description, price, image, stock }) {
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock = ? WHERE id = ?',
            [name, description, price, image, stock, id]
        );
    },

    async delete(id) {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
    },

    async count(search = '') {
        let query = 'SELECT COUNT(*) as count FROM products';
        let params = [];
        
        if (search) {
            query += ' WHERE name LIKE ? OR description LIKE ?';
            params = [`%${search}%`, `%${search}%`];
        }
        
        const [rows] = await pool.query(query, params);
        return rows[0].count;
    }
};

module.exports = Product; 