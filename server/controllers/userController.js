const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import User model

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).send("User registered successfully!");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid password");

  // Set user session in cookie
  req.session.user = user;

  res.status(200).send("Logged in successfully!");
});

// Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).send("Logged out successfully!");
  });
});

module.exports = router;