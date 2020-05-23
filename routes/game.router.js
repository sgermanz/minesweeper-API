var express = require('express');
var router = express.Router();
var gameController = require('../controllers/game.controller')

var authorize = require('../helpers/authorization.helper').authorize

const allowed_read_roles = [
  process.env.ROLE_USER,
  process.env.ROLE_ADMIN
]

const allowed_write_roles = [
  process.env.ROLE_ADMIN,
  process.env.ROLE_USER
]

/* GET */
router.get('/:id', authorize(allowed_read_roles), function(req, res) {
  gameController.getGameById(req, res);
});
router.get('/', authorize(allowed_read_roles), function(req, res) {
  gameController.getGames(req, res);
});

/* POST */
router.post('/', authorize(allowed_write_roles), function(req, res) {
  gameController.createGame(req, res);
});

/* UPDATE */
router.put('/:id', authorize(allowed_write_roles), function(req, res) {
  gameController.updateGame(req, res);
});

/* DELETE */
router.delete('/:id', authorize(allowed_write_roles), function(req, res) {
  gameController.deleteGame(req, res);
});

module.exports = router;
