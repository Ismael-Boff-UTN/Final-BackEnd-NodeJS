//Imports
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcrypt");
const { esEmailvalido } = require("../helpers/db-validadores");

//FUNCION GET DE USUARIOS
const getUsuarios = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
  //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los usuarios que no esten softdeleteados
  const usuarios = await Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    msg: "Lista De Usuarios",
    totalRegistros: usuarios.length,
    usuarios,
  });
};

//FUNCION POST DEL USUARIO
const postUsuarios = async (req, res = response) => {
  const { nombre, email, password, rol, apellido, telefono,} = req.body;
  const usuario = new Usuario({ nombre, email, password, rol,apellido,telefono, domicilio:req.body.domicilio});
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
};

//FUNCION PUT DEL USUARIO
const putUsuarios = async (req, res = response) => {
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
    usuario,
  });
};
const deleteUsuarios = async (req, res = response) => {
  const { id } = req.params;
  //const uid = req.uid;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  //const usuarioAutenticado = req.usuario;
  res.json({
    msg: `Usuario ${usuario.nombre}, Eliminado!`,
    usuario,
   // usuarioAutenticado
  });
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
};
