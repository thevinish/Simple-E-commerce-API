const User = require('../models/user');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        
        // Password validation: at least 6 chars, contains letter and number
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long and contain both letters and numbers.' });
        }
        
        // Check if user exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        
        // Create user
        const userId = await User.create({ username, email, password, role });
        const user = await User.findById(userId);
        
        // Create token
        const token = User.generateToken(userId, user.role);
        
        res.status(201).json({ success: true, token, user });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Create token
        const token = User.generateToken(user.id, user.role);
        
        res.status(200).json({ success: true, token, user });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, user });
    } catch (err) {
        next(err);
    }
};