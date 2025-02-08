const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import User model

// Register Route
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
};

// Login Route
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid password');

    req.session.user = user; // Set session after successful login
    res.status(200).send('Logged in successfully!');
  } catch (err) {
    res.status(500).send('Error logging in user');
  }
};

// Logout Route
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.status(200).send('Logged out successfully!');
  });
};
