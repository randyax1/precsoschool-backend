const bcrypt = require("bcryptjs");

const userStudentModel = require("../../models/student/user.student.model");

const createStudent = async (req, res) => {

  const { email, password } = req.body;

  try {
    
    let user = await userStudentModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya registrado anteriormente.",
      });
    }

    user = new userStudentModel(req.body);

    //Encriptacion contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      rol: user.rol,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor contacte al administrador.",
    });
  }
};

const loginStudent = async(req, res) => {
  const { email, password } = req.body;

  try {

    const user = await userStudentModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña no son correctos.",
      });
    }

    //Confirmacion de passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta.",
      });
    }

    //Generar JWT

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor contacte al administrador.",
    });
  }
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createStudent,
  loginStudent,
  renewToken,
};
