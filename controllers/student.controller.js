const bcrypt = require("bcryptjs");

const studentModel = require("../models/student/user.student.model");

const getStudents = async (req, res) => {

    const Students = await studentModel.find();

    res.status(200).json({
        ok: true,
        Students
    });
}

const updateStudent = async (req, res) => {

    const studentId = req.params.id;
    let { password } = req.body;

    try {

        const student = studentModel.findById( studentId );

        if(!student){
            return res.status(404).json({
                ok:false,
                msg: 'The student dont exist with that id.'
            }); 
        }

        //Encriptacion de contraseña
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);

        const newStudent = {
            ...req.body,
            password
        }

        //new: true es para que traiga al estudiante actualizado al momento en postman
        const studentUpdated = await studentModel.findByIdAndUpdate( studentId, newStudent, { new: true } );

        res.json({
            ok: true,
            student: studentUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Please contact the administrator'
        });
    }

}

const deleteStudent = async (req, res) => {

    const studentId = req.params.id;

    try {

        const student = studentModel.findById( studentId );

        if(!student){
            return res.status(404).json({
                ok: false,
                msg: 'The student dont exist with that id.'
            });
        }

        const studentDeleted = await studentModel.findByIdAndDelete( studentId );

        res.json({
            ok: true,
            msg: 'Student deleted',
            student: studentDeleted
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

}

module.exports = {
    getStudents,
    updateStudent,
    deleteStudent
}
