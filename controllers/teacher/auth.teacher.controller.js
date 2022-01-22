const userTeacherModel = require("../../models/teacher/user.teacher.model");

const createTeacher = async (req, res) => {

  //const { rol = "Docente", name, lastName, email, password } = req.body;

  try {

    const user = new userTeacherModel(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: "Registered teacher",
    });

  } catch (error) {
      res.status(500).json({
          ok: false,
          msg:'Porfavor contacte al administrador.'
      })
  }
};

const loginTeacher = (req, res) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "Teacher Logged",
    email,
    password,
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createTeacher,
  loginTeacher,
  renewToken,
};
