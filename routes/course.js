const express = require('express')
const router = express.Router()
const CourseController = require('../controllers/courseController')

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = "Please Login First"
        res.redirect(`/user?sessionError=${error}` )
    }else{
        next()
    }   
  })

router.get('/', CourseController.findAllCourses)
router.get('/:id', CourseController.doCourse)
router.get('/:id/delete', CourseController.courseDelete)




module.exports = router