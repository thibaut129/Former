var CompanyService = require('../services/companies.service')

_this = this


exports.getCompanies = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 50;

    console.log(page, limit)

    try{
        var companies = await CompanyService.getCompanies({}, page, limit)
        return res.status(200).json({status: 200, data: companies, message: "Succesfully Companies Received"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createCompany = async function(req, res, next){
    var company = {
        name: req.body.name,
        type: req.body.type,
        created: req.body.date
    }


    try{
        var createdCompany = await CompanyService.createCompany(company)
        return res.status(201).json({status: 201, data: createdCompany, message: "Succesfully Created Company"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Company Creation was Unsuccesfull", company: company})
    }
}

exports.updateCompany = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;
    var created = req.body.created;

    console.log(req.body)

    var company = {
        id,
        name: req.body.name ? req.body.name : null,
        type: req.body.type ? req.body.type : null,
        experiencesID: req.body.experiencesID ? req.body.experiencesID : null,
        icon: req.body.icon ? req.body.icon : null,
        created
    }

    try{
        var updatedCompany = await CompanyService.updateCompany(company)
        return res.status(200).json({status: 200, data: updatedCompany, message: "Succesfully Updated Company"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeCompany = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await CompanyService.deleteCompany(id)
        return res.status(204).json({status:204, message: "Succesfully Company Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}