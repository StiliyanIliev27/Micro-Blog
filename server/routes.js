const router = require('express').Router();
const userController = require('./controllers/userController');

// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
