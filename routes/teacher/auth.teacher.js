const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createTeacher, loginTeacher, renewToken } = require('../../controllers/teacher/auth.teacher.controller');
const { fieldValidator } = require('../../middlewares/field-validator');


router.post('/new',
[
    check('name', 'Name is required.').not().isEmpty(),
    check('lastName', 'Lastname is required.').not().isEmpty(),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Lenght of password must be more than 6 characters.').isLength({ min: 6 }),
    fieldValidator
], 
createTeacher);

router.post('/',
[
    check('email', 'Email is required.').isEmail(),
    check('password', 'Lenght of password must be more than 6 characters.').isLength({ min: 6 }),
    fieldValidator
], 
loginTeacher);

router.get('/renew', renewToken);

module.exports = router;

/* Rutas de Usuario de profesores / Auth
host + /api/auth/teacher
*/