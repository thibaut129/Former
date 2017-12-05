var Experience = require('../models/experience.model')

_this = this


exports.getExperiences = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var experiences = await Experience.paginate(query, options)
        return experiences;
    } catch (e) {
        throw Error('Error while Paginating Experiences')
    }
}

exports.createExperience = async function(experience){

    var newExperience = new Experience({
        type: experience.type,
        year: experience.year,
        location: experience.location,
        coords: experience.coords,
        companyID: experience.companyID,
        userID: experience.userID,
        created: new Date()
    })

    try{
        var savedExperience = await newExperience.save()
        return savedExperience;
    }catch(e){
        throw Error("Error while Creating Experience")
    }
}

exports.updateExperience = async function(experience){
    var id = experience.id

    try{
        var oldExperience = await Experience.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Experience")
    }

    if(!oldExperience){
        return false;
    }

    // console.log(oldExperience)

    // oldExperience.title = experience.title
    // oldExperience.description = experience.description
    // oldExperience.status = experience.status


    // console.log(oldExperience)

    try{
        var savedExperience = await oldExperience.save()
        return savedExperience;
    }catch(e){
        throw Error("And Error occured while updating the Experience");
    }
}

exports.deleteExperience = async function(id){

    try{
        var deleted = await Experience.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Experience Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Experience")
    }
}