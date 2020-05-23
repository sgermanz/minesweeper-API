var mongoose = require('mongoose');

function initialize(){
    let mongoPath = process.env.MONGO_PATH || "localhost";
    let mongoPort = process.env.MONGO_PORT || "27017";
    let mongoDB = process.env.MONGO_DB || "default";
    let connection = 'mongodb://' + mongoPath +':'+ mongoPort +'/' + mongoDB;
    mongoose.connect(connection);
}

module.exports = {
    initialize
}
