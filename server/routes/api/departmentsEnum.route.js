var express = require('express')

var router = express.Router()

var DepartmentEnumController = require('../../controllers/departmentsEnum.controller');

router.get('/', DepartmentEnumController.getDepartmentsEnum)
router.post('/', DepartmentEnumController.createDepartmentEnum)
router.put('/', DepartmentEnumController.updateDepartmentEnum)
router.delete('/:id',DepartmentEnumController.removeDepartmentEnum)

module.exports = router;