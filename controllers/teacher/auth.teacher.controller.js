const bcrypt = require("bcryptjs");

const userTeacherModel = require("../../models/teacher/user.teacher.model");
const { generateJWT } = require('../../helpers/jwt');

const createTeacher = async (req, res) => {

  const { email, password } = req.body;

  try {
  
    let user = await userTeacherModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists.",
      });
    }

    user = new userTeacherModel(req.body);

    //Encriptacion contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user.id,
      rol: user.rol,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator.",
    });
    
  }
};

const loginTeacher = async (req, res) => {
  
  const { email, password } = req.body;

  try {
  
    const user = await userTeacherModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The user or password are incorrect.",
      });
    }

    //Confirmacion de passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrect.",
      });
    }

    // Generar JWT
    const token = await generateJWT( user.id, user.name );

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  
  } catch (error) {
  
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator.",
    });
  }
};

const renewToken = async(req, res) => {

  const { uid, name } = req;

  const token = await generateJWT( uid, name );

  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  createTeacher,
  loginTeacher,
  renewToken
};
