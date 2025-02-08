require('dotenv').config();
const express = require("express");
const { initDb } = require("./config/databaseConfig");
const expressConfig = require("./config/expressConfig");
const { getErrorMessage } = require("./utils/errorHelper");
const routes = require('./routes'); // Import routes

const app = express();

expressConfig(app);
app.use(getErrorMessage);
app.use(routes); 

initDb();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
