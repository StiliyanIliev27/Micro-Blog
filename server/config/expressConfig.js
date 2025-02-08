const express = require('express');
const session = require('express-session');

const expressConfig = (app) => {
  // Body Parser middleware
  app.use(express.json());

  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'defaultsecret',
      resave: false,
      saveUninitialized: false,
    })
  );
};

module.exports = expressConfig;
