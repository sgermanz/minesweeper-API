var express = require('express');
var router = express.Router();

/* routers */
var userAuthRouter = require('./user-auth.router');

router.use('/users', userAuthRouter);

module.exports = router;
