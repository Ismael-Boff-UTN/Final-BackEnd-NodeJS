const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //Verificar Email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Email o Contraseña Incorrecto!",
      });
    }
    //Verificar Si El Usuario Esta Activo (No SoftDeleted)
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Email o Contraseña Incorrecto!",
      });
    }
    //Verificar La Contraseña
    const validarPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validarPassword) {
      return res.status(400).json({
        msg: "Email o Contraseña Incorrecto! - Password",
      });
    }

    //Generar El JWT (JSON Web Token)
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error De Login, Revisar Credenciales",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, nombre, apellido, img } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ email });
    //Si El Usuario NO Existe
    if (!usuario) {
      //Se Crea

      const data = {
        nombre,
        apellido,
        password: "xD",
        email,
       
        img,

        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }
    //Si El Usuario Esta SoftDeleteado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "El Usuario Esta Deshabilitado!",
      });
    }
    //Generar El JWT (JSON Web Token)
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Google OK",
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token De Google Invalido!",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
