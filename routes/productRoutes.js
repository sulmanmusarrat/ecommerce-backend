const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// 🛡️ Optional middleware for admin verification (you can implement this later)
// const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/', /* verifyAdmin, */ createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', /* verifyAdmin, */ updateProduct);
router.delete('/:id', /* verifyAdmin, */ deleteProduct);

module.exports = router;
