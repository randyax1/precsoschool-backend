const { Router } = require('express');
const { getStudents, updateStudent, deleteStudent } = require('../controllers/student.controller');
const router = Router();

router.get('/', getStudents );

router.put('/:id', updateStudent );

router.delete('/:id', deleteStudent );

module.exports = router;

/* Ruta de estudiantes / students
host + /api/students
*/