
const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");

  //Si No Hay Token
  if (!token) {
    return res.status(401).json({
      msg: "Debe Insertar Un Token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    //Validar Que Exista Fisicamente En La DB
    if (!usuario) {
        return res.status(401).json({
          msg: "Token No Valido, Usuario No Existe En La DB",
        });
      }
  
    //Verificar Que El Usuario Tenga Estado true, (No SoftDeleted)
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token No Valido, Usuario No Existe",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    //Si Hay Token Pero No Es Valido (Fue Modificado o Esta Mal Redactado)
    res.status(401).json({
      msg: "Token No Valido",
    });
  }
};

module.exports = {
  validarJWT,
};
