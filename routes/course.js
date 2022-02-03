const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/course.controller');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

//Todos los endpoints pasaran por la validcion de JWT
router.use( validateJWT );

router.post('/',
[
    check('name', 'Name of course is required.').not().isEmpty(),
    check('description'),
    check('start', 'The begin date is necessary.').custom( isDate ),
    check('end', 'The end date is necessary.').custom( isDate ),
    fieldValidator
], 
createCourse);

router.get('/', getCourses);

router.put('/:id', updateCourse);

router.delete('/:id', deleteCourse);

module.exports = router;

/* Ruta de los cursos /courses
host + /api/courses
*/