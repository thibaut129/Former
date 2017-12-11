var FilterEnum = require('../models/filterEnum.model')

_this = this


exports.getFiltersEnum = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var filtersEnum = await FilterEnum.paginate(query, options)
        return filtersEnum;
    } catch (e) {
        throw Error('Error while Paginating FiltersEnum')
    }
}

exports.createFilterEnum = async function(filterEnum){

    var newFilterEnum = new FilterEnum({
        name: filterEnum.name,
        created: new Date(),
    })

    try{
        var savedFilterEnum = await newFilterEnum.save()
        return savedFilterEnum;
    }catch(e){
        throw Error("Error while Creating FilterEnum")
    }
}

exports.updateFilterEnum = async function(filterEnum){
    var id = filterEnum.id

    try{
        var oldFilterEnum = await FilterEnum.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the FilterEnum")
    }

    if(!oldFilterEnum){
        return false;
    }

    console.log(oldFilterEnum)

    oldFilterEnum.name = filterEnum.name

    console.log(oldFilterEnum)

    try{
        var savedFilterEnum = await oldFilterEnum.save()
        return savedFilterEnum;
    }catch(e){
        throw Error("And Error occured while updating the FilterEnum");
    }
}

exports.deleteFilterEnum = async function(id){

    try{
        var deleted = await FilterEnum.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("FilterEnum Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the FilterEnum")
    }
}