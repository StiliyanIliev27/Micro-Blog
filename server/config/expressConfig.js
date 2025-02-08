require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");

function expressConfig(app) {
  app.use(express.json());

  app.use(cookieParser()); // Parse cookies

  app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
      credentials: true, // Enable cookies to be sent with requests
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET, // This should be your secret key from the environment
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
}

module.exports = expressConfig;
