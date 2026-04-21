const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [100, 'Price must be at least 100'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Grocery'],
      message: 'Category must be Electronics, Clothing, or Grocery',
    },
  },
  stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Product', productSchema);
