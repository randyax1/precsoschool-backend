const userStudentModel = require("../../models/student/user.student.model");

const createStudent = async(req, res) => {

    //const { rol = "Estudiante", name, lastname, email, password } = req.body;

    try {

        const user = new userStudentModel(req.body);
    
        await user.save();
    
        res.status(201).json({
          ok: true,
          msg: "Registered student",
        });
    
      } catch (error) {
          res.status(500).json({
              ok: false,
              msg:'Porfavor contacte al administrador.'
          })
      }
    };

const loginStudent = (req, res) => {

    const {email, password } = req.body;

    res.json({
        ok:true,
        msg: 'Student Logged',
        email,
        password
    })
}

const renewToken = ( req, res) => {
    res.json({
        ok:true,
        msg: 'renew'
    })
}

module.exports = {
    createStudent,
    loginStudent,
    renewToken
}