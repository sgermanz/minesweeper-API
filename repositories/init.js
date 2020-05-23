var mongoose = require('mongoose');

function initialize(){
    let mongoPath = process.env.MONGO_PATH || "localhost";
    let mongoPort = process.env.MONGO_PORT || "27017";
    let mongoDB = process.env.MONGO_PATH || "default";
    mongoose.connect('mongodb://' + mongoPath +':'+ mongoPort +'/' + mongoDB);
}

module.exports = {
    initialize
}
