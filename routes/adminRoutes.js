const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');
const Order = require('../models/Order');

// POST /api/admin/login
router.post('/login', loginAdmin);

// GET /api/admin/orders - Fetch all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/orders - Update order status
router.put('/orders', async (req, res) => {
  const { orderId, newStatus } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order' });
  }
});

// DELETE /api/admin/orders/:id - Delete order by ID
router.delete('/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

module.exports = router;
