var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController')

var authorize = require('../helpers/authorization.helper').authorize

const allowed_read_roles = [
  process.env.ROLE_USER
]

const allowed_write_roles = [
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
router.post('/:id/flag', authorize(allowed_write_roles), function(req, res) {
  gameController.flagCell(req, res);
});
router.post('/:id/question', authorize(allowed_write_roles), function(req, res) {
  gameController.questionCell(req, res);
});
router.post('/:id/reveal', authorize(allowed_write_roles), function(req, res) {
  gameController.revealCell(req, res);
});

/* DELETE */
router.delete('/:id', authorize(allowed_write_roles), function(req, res) {
  gameController.deleteGame(req, res);
});

module.exports = router;
