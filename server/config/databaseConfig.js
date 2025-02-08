const mongoose = require("mongoose");

const initDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://root:rootpassword@localhost:27017/micro-blog?authSource=admin';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🔥 MongoDB Connected");
  } catch (error) {
    console.error("🔥 MongoDB Connection Error", error);
  }
};

module.exports = { initDb };
