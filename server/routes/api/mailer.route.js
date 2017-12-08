var express = require('express');

var router = express.Router();

var RouteController = require('../../controllers/mailer.controller');

router.post('/', RouteController.sendmail);


module.exports = router;