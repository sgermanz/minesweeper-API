var _ = require('lodash');

function getObjectFromMongoose(element){
    return element.toObject();
}

function getObjectsFromMongoose(elements){
    let objects = [];
    for(var i = 0; i < elements.length; i++){
        objects.push(elements[i].toObject());
    }
    return objects;
}

function compareMongooseObjects(object1, object2, attributes){
    let equal = true;
    for(var i = 0; i < attributes.length; i++){
        let attribute = attributes[i]
        let current_equal = true;
        // if((typeof object1[attribute]).localeCompare("object") == 0){
        //     current_equal = compareMongooseObjects(object1[attribute], object2[attribute], Object.keys(object2[attribute]))
        // }
        // else{
            current_equal = _.isEqual(object1[attribute], object2[attribute]);
        // }
        equal = equal && current_equal;
    }

    return equal;
}

module.exports = {
    getObjectFromMongoose,
    getObjectsFromMongoose,
    compareMongooseObjects
}