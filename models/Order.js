const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  items: [
    {
      id: String,
      title: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

// Optional debug: log what's being saved
orderSchema.pre('save', function (next) {
  console.log('✅ Saving order with:', this);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
