const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/courseController')



router.get('/', CourseController.findAllCourses)
// router.get('/:id', CourseController.doCourse)


module.exports = router