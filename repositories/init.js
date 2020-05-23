var mongoose = require('mongoose');

function initialize(){
    mongoose.connect('mongodb://'+process.env.MONGO_PATH+':'+ process.env.MONGO_PORT +'/' + process.env.MONGO_DB);
}

module.exports = {
    initialize
}
