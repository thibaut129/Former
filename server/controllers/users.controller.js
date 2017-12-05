var UserService = require('../services/users.service')

_this = this


exports.getUsers = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({status: 200, data: users, message: "Succesfully Users Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

// exports.getUsersById = async function(req, res, next) {
//
//     if(!req.params.id){
//         return res.status(400).json({status: 400., message: "Id must be present"})
//     }
//
//     var id = req.params.id;
//
//     // console.log(req.params)
//
//     try{
//         var user = await UserService.getUserById(id)
//         return res.status(200).json({status: 200, data: user, message: "Succesfully User Received"})
//     }catch(e){
//         return res.status(400).json({status: 400., message: e.message})
//     }
// }



exports.createUser = async function(req, res, next){
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        date: req.body.date,
        department: req.body.department,
        option: req.body.option
    }


    try{
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull", user: user})
    }
}

exports.updateUser = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully User Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}