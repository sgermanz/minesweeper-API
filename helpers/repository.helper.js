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

module.exports = {
    getObjectFromMongoose,
    getObjectsFromMongoose
}