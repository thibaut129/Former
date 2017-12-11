var FilterEnumService = require('../services/filtersEnum.service')

_this = this


exports.getFiltersEnum = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    console.log(page, limit)

    try{
        var filtersEnum = await FilterEnumService.getFiltersEnum({}, page, limit)
        return res.status(200).json({status: 200, data: filtersEnum, message: "Succesfully FiltersEnum Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createFilterEnum = async function(req, res, next){
    var filterEnum = {
        name: req.body.name,
        created: req.body.created,
    }


    try{
        var createdFilterEnum = await FilterEnumService.createFilterEnum(filterEnum)
        return res.status(201).json({status: 201, data: createdFilterEnum, message: "Succesfully Created FilterEnum"})
    }catch(e){
        return res.status(400).json({status: 400, message: "FilterEnum Creation was Unsuccesfull", filterEnum: filterEnum})
    }
}

exports.updateFilterEnum = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var filterEnum = {
        id,
        name: req.body.name ? req.body.name : null,
    }

    try{
        var updatedFilterEnum = await FilterEnumService.updateFilterEnum(filterEnum)
        return res.status(200).json({status: 200, data: updatedFilterEnum, message: "Succesfully Updated FilterEnum"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeFilterEnum = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await FilterEnumService.deleteFilterEnum(id)
        return res.status(204).json({status:204, message: "Succesfully FilterEnum Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}