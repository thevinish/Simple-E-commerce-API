const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middlewares/auth');
const { authorize } = require('../middlewares/role');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin only routes
router.post('/', protect, authorize('admin'), productController.createProduct);
router.put('/:id', protect, authorize('admin'), productController.updateProduct);
router.delete('/:id', protect, authorize('admin'), productController.deleteProduct);

module.exports = router;