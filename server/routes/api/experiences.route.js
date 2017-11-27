var express = require('express')

var router = express.Router()

var ExperienceController = require('../../controllers/experiences.controller');

router.get('/', ExperienceController.getExperiences)
router.post('/', ExperienceController.createExperience)
router.put('/', ExperienceController.updateExperience)
router.delete('/:id',ExperienceController.removeExperience)

module.exports = router;