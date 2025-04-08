const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String, default: '' },
  category: { type: String, enum: ['Men', 'Women', 'Kids'], required: true },
  type: { type: String, enum: ['Stitched', 'Unstitched'], required: true },
  material: { type: String, default: '' },
  colors: [{ type: String }], // e.g., ["Red", "Black"]
  sizes: [{ type: String }],  // e.g., ["S", "M", "L"]
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
