var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var users = require('./api/users.route')
var experiences = require('./api/experiences.route')
var markers = require('./api/markers.route')
var companies = require('./api/companies.route')


router.use('/todos', todos);
router.use('/users', users);
router.use('/experiences', experiences);
router.use('/markers', markers);
router.use('/companies', companies);


module.exports = router;