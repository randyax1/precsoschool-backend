const bcrypt = require("bcryptjs");

const teacherModel = require("../models/teacher/user.teacher.model");

const getTeachers = async (req, res) => {

    const Teachers = await teacherModel.find();
  
    res.status(200).json({
      ok: true,
      Teachers
    });
  }

  const updateTeacher = async (req, res) => {

    const teacherId = req.params.id;
    let { password } = req.body;

    try {

      const teacher = teacherModel.findById( teacherId );
      
      if(!teacher){
        return res.status(404).json({
          ok:false,
          msg:'The teacher dont exist with that id.'
        });
      }

      //Encriptacion contraseña
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password, salt);

      const newTeacher = {
        ...req.body,
        password
      }

       //new: true es para que traiga al profesor actualizado al momento en postman
       const teacherUpdated = await teacherModel.findByIdAndUpdate( teacherId, newTeacher, { new: true } );

       res.json({
         ok:true,
         teacher: teacherUpdated
       });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

  }

  const deleteTeacher = async(req, res) => {

    const teacherId = req.params.id;

    try {

      const teacher = teacherModel.findById(teacherId);

      if(!teacher){
        return res.status(404).json({
          ok:false,
          msg: 'The teacher dont exist with that id.'
        });
      }

      const teacherDeleted = await teacherModel.findByIdAndDelete( teacherId );

        res.json({
            ok: true,
            msg:'Teacher deleted',
            teacher: teacherDeleted
        });
      
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

  }

  module.exports = {
      getTeachers,
      updateTeacher,
      deleteTeacher
  }