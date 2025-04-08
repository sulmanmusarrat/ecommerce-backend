const Product = require('../models/Product');

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const {
      title, description, price, quantity,
      brand, category, type, material,
      colors, sizes, imageUrl
    } = req.body;

    if (!title || !price || !quantity || !category || !type || !imageUrl) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newProduct = new Product({
      title,
      description: description || '',
      price,
      quantity,
      brand: brand || '',
      category,
      type,
      material: material || '',
      colors: colors || [],
      sizes: sizes || [],
      imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      message: '✅ Product created successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('❌ Error creating product:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// READ - All products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// READ - Single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product }); // ✅ wrapped
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      message: '✅ Product updated successfully',
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: '🗑️ Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
