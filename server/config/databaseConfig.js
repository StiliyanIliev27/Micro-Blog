const mongoose = require('mongoose');

exports.initDb = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 MongoDB Connected"))
    .catch((err) => console.log("MongoDB connection error:", err));
};