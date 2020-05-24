var mongoose = require('mongoose');

function initialize(){
    let connection = process.env.MONGODB_URI;
    mongoose.connect(connection);
}

module.exports = {
    initialize
}
