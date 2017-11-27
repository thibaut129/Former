var CompanyService = require('../services/companies.service')

_this = this


exports.getCompanies = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        date: req.body.date,
        department: req.body.department,
        option: req.body.option
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

    console.log(req.body)

    var company = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
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