var ExperienceService = require('../services/experiences.service')

_this = this


exports.getExperiences = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    console.log(page, limit)

    try{
        var experiences = await ExperienceService.getExperiences({}, page, limit)
        return res.status(200).json({status: 200, data: experiences, message: "Succesfully Experiences Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createExperience = async function(req, res, next){
    var experience = {
        type: req.body.type,
        location: req.body.location,
        year: req.body.year,
        coords: req.body.coords,
        companyID: req.body.companyID,
        userID: req.body.userID,
        filters: req.body.filters,
        created: req.body.date,
    }


    try{
        var createdExperience = await ExperienceService.createExperience(experience)
        return res.status(201).json({status: 201, data: createdExperience, message: "Succesfully Created Experience"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Experience Creation was Unsuccesfull", experience: experience})
    }
}

exports.updateExperience = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var experience = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedExperience = await ExperienceService.updateExperience(experience)
        return res.status(200).json({status: 200, data: updatedExperience, message: "Succesfully Updated Experience"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeExperience = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await ExperienceService.deleteExperience(id)
        return res.status(204).json({status:204, message: "Succesfully Experience Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}