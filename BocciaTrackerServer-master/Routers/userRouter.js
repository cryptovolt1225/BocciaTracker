// set router
const { Router } = require('express');

const UserRouter = new Router();

const {
  register,
  login,
} = require('../Middleware/authentication');

// endpoints
UserRouter.post('/register', register);
UserRouter.post('/login', login);

module.exports = { UserRouter };
