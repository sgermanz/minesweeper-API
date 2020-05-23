var express = require('express');
var router = express.Router();
const passport = require('passport');

/* routers */
var userAuthRouter = require('./user-auth.router');
var gameRouter = require('./game.router');

router.use('/users', userAuthRouter);
router.use('/games', passport.authenticate('jwt', { session: false }), gameRouter);

module.exports = router;
