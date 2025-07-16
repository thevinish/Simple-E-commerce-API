const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

router.post('/', protect, orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrder);

// Admin only routes
router.get('/', protect, authorize('admin'), orderController.getAllOrders);

module.exports = router;