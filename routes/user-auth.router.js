var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');


/* POST */
router.post('/login', function(req, res, next) {
  userController.login(req, res, next);
});

router.post('/register', function(req, res) {
  userController.register(req, res);
});

module.exports = router;
