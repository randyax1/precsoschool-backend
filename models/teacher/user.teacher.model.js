const { Schema, model } = require('mongoose');

const userSchema = Schema({
    rol:{ type: String, default:'teacher'},
    name:{ type: String, required: true },
    lastName:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = model( 'teacherUser', userSchema );