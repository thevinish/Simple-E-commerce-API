const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, cartController.getCart);
router.post('/items', protect, cartController.addToCart);
router.put('/items/:productId', protect, cartController.updateCartItem);
router.delete('/items/:productId', protect, cartController.removeFromCart);
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;