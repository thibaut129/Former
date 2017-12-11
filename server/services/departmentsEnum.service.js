var DepartmentEnum = require('../models/departmentEnum.model')

_this = this


exports.getDepartmentsEnum = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var departmentsEnum = await DepartmentEnum.paginate(query, options)
        return departmentsEnum;
    } catch (e) {
        throw Error('Error while Paginating DepartmentsEnum')
    }
}

exports.createDepartmentEnum = async function(departmentEnum){

    var newDepartmentEnum = new DepartmentEnum({
        name: departmentEnum.name,
        option: departmentEnum.option,
        created: new Date(),
    })

    try{
        var savedDepartmentEnum = await newDepartmentEnum.save()
        return savedDepartmentEnum;
    }catch(e){
        throw Error("Error while Creating DepartmentEnum")
    }
}

exports.updateDepartmentEnum = async function(departmentEnum){
    var id = departmentEnum.id

    try{
        var oldDepartmentEnum = await DepartmentEnum.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the DepartmentEnum")
    }

    if(!oldDepartmentEnum){
        return false;
    }

    console.log(oldDepartmentEnum)

    oldDepartmentEnum.name = departmentEnum.name
    oldDepartmentEnum.option = departmentEnum.option

    console.log(oldDepartmentEnum)

    try{
        var savedDepartmentEnum = await oldDepartmentEnum.save()
        return savedDepartmentEnum;
    }catch(e){
        throw Error("And Error occured while updating the DepartmentEnum");
    }
}

exports.deleteDepartmentEnum = async function(id){

    try{
        var deleted = await DepartmentEnum.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("DepartmentEnum Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the DepartmentEnum")
    }
}