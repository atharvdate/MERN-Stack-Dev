const express  = require('express');
const mongoose = require('mongoose');
const User     = require('./userModel');
const app      = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb')
  .then(() => console.log('MongoDB connected to userdb'))
  .catch(err => console.error('MongoDB error:', err.message));

// Register user
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully', data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find().select('-__v');
  res.json({ success: true, count: users.length, data: users });
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted', data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
  console.log('Make sure MongoDB is running: mongod');
  console.log('  POST /register  - Register user');
  console.log('  GET  /users     - Get all users');
  console.log('  DEL  /users/:id - Delete user');
});
