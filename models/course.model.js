const { Schema, model } = require('mongoose');

const courseSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, default: 'Description not provided.' },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
});

module.exports = model('course', courseSchema );