var DepartmentEnumService = require('../services/departmentsEnum.service')

_this = this


exports.getDepartmentsEnum = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    console.log(page, limit)

    try{
        var departmentsEnum = await DepartmentEnumService.getDepartmentsEnum({}, page, limit)
        return res.status(200).json({status: 200, data: departmentsEnum, message: "Succesfully DepartmentsEnum Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createDepartmentEnum = async function(req, res, next){
    var departmentEnum = {
        name: req.body.name,
        option: req.body.option,
        created: req.body.created,
    }


    try{
        var createdDepartmentEnum = await DepartmentEnumService.createDepartmentEnum(departmentEnum)
        return res.status(201).json({status: 201, data: createdDepartmentEnum, message: "Succesfully Created DepartmentEnum"})
    }catch(e){
        return res.status(400).json({status: 400, message: "DepartmentEnum Creation was Unsuccesfull", departmentEnum: departmentEnum})
    }
}

exports.updateDepartmentEnum = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var departmentEnum = {
        id,
        name: req.body.name ? req.body.name : null,
        option: req.body.option ? req.body.option : null,
    }

    try{
        var updatedDepartmentEnum = await DepartmentEnumService.updateDepartmentEnum(departmentEnum)
        return res.status(200).json({status: 200, data: updatedDepartmentEnum, message: "Succesfully Updated DepartmentEnum"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeDepartmentEnum = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await DepartmentEnumService.deleteDepartmentEnum(id)
        return res.status(204).json({status:204, message: "Succesfully DepartmentEnum Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}