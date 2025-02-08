require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Enable cookies to be sent with requests
}));

// Session configuration (for cookies)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true in production if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 Day
    },
  })
);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("🔥 MongoDB Connected"))
  .catch((err) => console.log(err));

// User model
const User = require("./models/User");

// Routes
app.get("/", (req, res) => {
  res.send("Micro-Blogging API is Running!");
});

// Register Route
app.post("/register", async (req, res) => {
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
app.post("/login", async (req, res) => {
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
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).send("Logged out successfully!");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
