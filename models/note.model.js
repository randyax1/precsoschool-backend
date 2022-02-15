const { Schema, model } = require("mongoose");

const noteSchema = Schema({
    practiceNote: { type: Number, required: true },
    partialRating: { type: Number, required: true },
    examScore: { type: Number, required: true },
    finalAverage: { type: Number, default: 5 } 
});

module.exports = model( 'note', noteSchema );