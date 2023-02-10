const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;
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
        msg: "Email o Contraseña Incorrecto!",
      });
    }

    //Generar El JWT (JSON Web Token)
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      status: true,
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error De Login, Revisar Credenciales",
    });
  }
};

const adminLogin = async (req, res = response) => {
  try {
    const { email, password } = req.body;
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
        msg: "Email o Contraseña Incorrecto!",
      });
    }

    if (
      usuario.rol === "ADMIN_ROLE" ||
      usuario.rol === "COCINERO_ROLE" ||
      usuario.rol === "DELIVERY_ROLE" ||
      usuario.rol === "CAJA_ROLE"
    ) {
      //Generar El JWT (JSON Web Token)
      const token = await generarJWT(usuario.id);

      res.status(200).json({
        msg: "Login OK",
        usuario,
        token,
      });
    } else {
      return res.status(400).json({
        msg: `Usuario No valido ${usuario.rol}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error De Login, Revisar Credenciales",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  
  try {
    const { id_token } = req.body;
    const { email, nombre, apellido, img } = await googleVerify(id_token);

    //console.log("email seria: "+email)

    let usuario = await Usuario.findOne({ email });
    
    //console.log("el email seria: " + usuario)


    //Si El Usuario NO Existe
    if (usuario === null) {
      //Se Crea
      console.log("se intnto crear");
      const data = {
        nombre,
        apellido,
        password: "PlaceHolder",
        email,
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }
    //Si Existe La Cuenta Con Mismo Mail pero logueado Con google
    if (usuario.email === email && usuario.google === false) {
      await Usuario.findByIdAndUpdate(usuario._id, {
        google: true,
        img,
      });
      //Generar El JWT (JSON Web Token)
      const token = await generarJWT(usuario.id);

      res.status(200).json({
        status: true,
        msg: "Google OK",
        usuario,
        token,
      });
    }
    //Si El Usuario Esta SoftDeleteado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "El Usuario Esta Deshabilitado!",
      });
    }
    //Generar El JWT (JSON Web Token)
    const token = await generarJWT(usuario.id);

    res.status(200).json({
      status: true,
      msg: "Google OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: "Token De Google Invalido!",
    });
  }
};

const renewToken = async (req, res = response) => {
  try {
    //Generar El JWT (JSON Web Token)

    const { _id, nombre } = req.usuario;
    const usuario = req.usuario;
    const token = await generarJWT(_id);

    res.json({
      ok: true,
      msg: "Token Renewed",
      token,
      _id,
      nombre,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  login,
  googleSignIn,
  adminLogin,
  renewToken,
};
