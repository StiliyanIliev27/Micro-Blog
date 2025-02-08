const router = require('express').Router();

const userController = require('./controllers/userController');

router.use('/users', userController);

// Export the router
module.exports = router;