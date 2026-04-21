const express  = require('express');
const mongoose = require('mongoose');
const Product  = require('./productModel');
const app      = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/productdb')
  .then(() => console.log('MongoDB connected to productdb'))
  .catch(err => console.error('MongoDB error:', err.message));

// Add product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, message: 'Product added', data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find().select('-__v');
  res.json({ success: true, count: products.length, data: products });
});

// Get by category
app.get('/products/category/:cat', async (req, res) => {
  const products = await Product.find({ category: req.params.cat });
  res.json({ success: true, count: products.length, data: products });
});

// Update product
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product updated', data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted', data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Make sure MongoDB is running: mongod');
  console.log('  POST   /products            - Add product');
  console.log('  GET    /products            - Get all products');
  console.log('  GET    /products/category/:cat - Filter by category');
  console.log('  PUT    /products/:id        - Update product');
  console.log('  DELETE /products/:id        - Delete product');
});
