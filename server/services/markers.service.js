var Marker = require('../models/marker.model')

_this = this


exports.getMarkers = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var markers = await Marker.paginate(query, options)
        return markers;
    } catch (e) {
        throw Error('Error while Paginating Markers')
    }
}

exports.createMarker = async function(marker){

    var newMarker = new Marker({
        coords: marker.coords,
        experiences: marker.experiences,
        created: new Date(),
    })

    try{
        var savedMarker = await newMarker.save()
        return savedMarker;
    }catch(e){
        throw Error("Error while Creating Marker")
    }
}

exports.updateMarker = async function(marker){
    var id = marker.id

    try{
        var oldMarker = await Marker.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Marker")
    }

    if(!oldMarker){
        return false;
    }

    console.log(oldMarker)

    oldMarker.title = marker.title
    oldMarker.description = marker.description
    oldMarker.status = marker.status


    console.log(oldMarker)

    try{
        var savedMarker = await oldMarker.save()
        return savedMarker;
    }catch(e){
        throw Error("And Error occured while updating the Marker");
    }
}

exports.deleteMarker = async function(id){

    try{
        var deleted = await Marker.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Marker Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Marker")
    }
}