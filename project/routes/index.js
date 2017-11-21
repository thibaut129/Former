var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/platform', function(req, res, next) {
  res.render('platform-search/home', { title: 'Plateforme de Recherche' });
  // res.send('hi');
});

/* GET home page. */
router.get('/global', function(req, res, next) {
  res.render('global-screen/home', { title: 'Global' });
});

/* GET home page. */
router.get('/borne', function(req, res, next) {
  res.render('borne-form/home', { title: 'Borne' });
});



module.exports = router;
