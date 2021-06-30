//Imports
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcrypt");
const { esEmailvalido } = require("../helpers/db-validadores");

//FUNCION GET DE USUARIOS
const getUsuarios = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
    //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;
    //estado : true, Retorna solo los usuarios que no esten softdeleteados
    const usuarios = await Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      msg: "Lista De Usuarios",
      totalRegistros: usuarios.length,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION POST DEL USUARIO
const postUsuarios = async (req, res = response) => {
  try {
    const { nombre, email, password, rol, apellido, telefono, img } = req.body;
    console.log(img);
    const usuario = new Usuario({
      nombre,
      email,
      password,
      rol,
      apellido,
      telefono,
      domicilio: req.body.domicilio,
      img,
    });
    //Verificar Si El Email Existe Usando Mi Helper Pesonalizado
    esEmailvalido(email);
    //Encriptar Contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //Guardo El Usuario
    await usuario.save();
    res.json({
      msg: "Insertado Correctamente!",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION PUT DEL USUARIO
const putUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
      //Encriptar Contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Usuario Actualizado Correctamente!",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const deleteUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuarioEncontrado = await Usuario.findById(id);

    if (usuarioEncontrado.estado === true) {
      const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false,
      });

      res.status(200).json({
        status: true,
        msg: `Usuario : ${usuario.nombre}, Eliminado!`,
      });
    } else {
      const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: true,
      });

      res.status(200).json({
        status: true,
        msg: `Usuario : ${usuario.nombre}, Reestrablecido!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
};
