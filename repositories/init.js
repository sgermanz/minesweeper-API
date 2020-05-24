var mongoose = require('mongoose');

function initialize(){
    let connection = process.env.MONGO_URI;
    mongoose.connect(connection);
}

module.exports = {
    initialize
}
