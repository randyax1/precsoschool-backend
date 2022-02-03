const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createStudent, loginStudent, renewToken } = require('../../controllers/student/auth.student.controller');
const { fieldValidator } = require('../../middlewares/field-validator');
const { validateJWT } = require('../../middlewares/jwt-validator');


router.post('/new',
[
    check('name', 'Name is required.').not().isEmpty(),
    check('lastName', 'Lastname is required.').not().isEmpty(),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Lenght of password must be more than 6 characters.').isLength({ min: 6 }),
    fieldValidator
],  
createStudent);

router.post('/',
[
    check('email', 'Email is required.').isEmail(),
    check('password', 'Lenght of password must be more than 6 characters.').isLength({ min: 6 }),
    fieldValidator
], 
loginStudent);

router.get('/renew', validateJWT, renewToken);

module.exports = router;

/* Rutas de Usuario de estudiantes / Auth
host + /api/auth/student
*/