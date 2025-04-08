// controllers/orderController.js
const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

module.exports = { placeOrder };
