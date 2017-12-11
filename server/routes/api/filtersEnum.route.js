var express = require('express')

var router = express.Router()

var FilterEnumController = require('../../controllers/filtersEnum.controller');

router.get('/', FilterEnumController.getFiltersEnum)
router.post('/', FilterEnumController.createFilterEnum)
router.put('/', FilterEnumController.updateFilterEnum)
router.delete('/:id',FilterEnumController.removeFilterEnum)

module.exports = router;