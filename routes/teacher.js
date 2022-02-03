const { Router } = require('express');
const router = Router();
const { getTeachers, updateTeacher, deleteTeacher } = require('../controllers/teacher.controller');

router.get('/', getTeachers);

router.put('/:id',updateTeacher);

router.delete('/:id', deleteTeacher);

module.exports = router;

/* Ruta de los profesores /teachers
host + /api/teachers
*/