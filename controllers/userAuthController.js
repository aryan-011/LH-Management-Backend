// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../config/config');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id, name: user.name, role: user.role }, secretKey, { expiresIn: '1h' });

    // Set JWT as a cookie
    res.cookie('jwt', token, { httpOnly: true, secure: false }); // Set to true if using HTTPS

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
};
