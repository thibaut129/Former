var express = require('express')

var router = express.Router()

var MarkerController = require('../../controllers/markers.controller');

router.get('/', MarkerController.getMarkers)
router.post('/', MarkerController.createMarker)
router.put('/', MarkerController.updateMarker)
router.delete('/:id',MarkerController.removeMarker)

module.exports = router;