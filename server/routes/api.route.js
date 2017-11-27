var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var users = require('./api/users.route')


router.use('/todos', todos);
router.use('/users', users);
// router.use('/experiences', users);
// router.use('/markers', users);
// router.use('/companies', users);


module.exports = router;