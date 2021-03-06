var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var users = require('./api/users.route')
var experiences = require('./api/experiences.route')
var markers = require('./api/markers.route')
var companies = require('./api/companies.route')
var departmentsEnum = require('./api/departmentsEnum.route')
var filtersEnum = require('./api/filtersEnum.route')
var mailer = require('./api/mailer.route')


router.use('/todos', todos);
router.use('/users', users);
router.use('/experiences', experiences);
router.use('/markers', markers);
router.use('/companies', companies);
router.use('/departmentEnum', departmentsEnum);
router.use('/filterEnum', filtersEnum);
router.use('/mailer', mailer);


module.exports = router;