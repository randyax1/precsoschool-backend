const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/note.controller');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

//Todos los endpoints pasaran por la validacion de JWT
router.use( validateJWT );

router.post('/', 
[
    check('practiceNote', 'The note for the practice is required.').not().isEmpty(),
    check('practiceNote', 'The minimum value must be 5 and maximum value must be 10.').isFloat({ min:5, max: 10 }),

    check('partialRating', 'The partial rating is required.').not().isEmpty(),
    check('partialRating', 'The minimum value must be 5 and maximum value must be 10.').isFloat({ min:5, max: 10 }),

    check('examScore', 'The exam score is required.').not().isEmpty(),
    check('examScore', 'The minimum value must be 5 and maximum value must be 10.').isFloat({ min:5, max: 10 }),

    check('finalAverage'),
    fieldValidator
],
createNote );

router.get('/', getNotes );

router.put('/:id', updateNote );

router.delete('/:id', deleteNote );

module.exports = router;

/*  Ruta de los profesores /notes
host + /api/notes
*/