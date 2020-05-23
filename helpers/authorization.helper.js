function authorize(authorized_roles){
    return (req, res, next, )=>{
        if(authorized_roles.includes(req.user.role)){
            next();
        }
        else{
            throw "User not authorized";
        }
    }
}

module.exports = {
    authorize
}