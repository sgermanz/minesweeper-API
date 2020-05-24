'use strict'

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var gameSchema = Schema({
    rows: Number,
    columns: Number,
    mines: Number,
    field: [[{
        flagged: Boolean,
        mined: Boolean,
        question: Boolean,
        revealed: Boolean,
        adjacent_mines: Number
    }]],
    revealed: { type: String, default: 0},
    finished: { type: Boolean, default: false}
});

module.exports = mongoose.model('game', gameSchema, "games");