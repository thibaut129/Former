var MarkerService = require('../services/markers.service')

_this = this


exports.getMarkers = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    console.log(page, limit)

    try{
        var markers = await MarkerService.getMarkers({}, page, limit)
        return res.status(200).json({status: 200, data: markers, message: "Succesfully Markers Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createMarker = async function(req, res, next){
    var marker = {
        coords: req.body.coords,
        experiences: req.body.experiences,
        created: req.body.created,
    }


    try{
        var createdMarker = await MarkerService.createMarker(marker)
        return res.status(201).json({status: 201, data: createdMarker, message: "Succesfully Created Marker"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Marker Creation was Unsuccesfull", marker: marker})
    }
}

exports.updateMarker = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var marker = {
        id,
        coords: req.body.coords ? req.body.coords : null,
        experiences: req.body.experiences ? req.body.experiences : null,
    }

    try{
        var updatedMarker = await MarkerService.updateMarker(marker)
        return res.status(200).json({status: 200, data: updatedMarker, message: "Succesfully Updated Marker"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeMarker = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await MarkerService.deleteMarker(id)
        return res.status(204).json({status:204, message: "Succesfully Marker Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}