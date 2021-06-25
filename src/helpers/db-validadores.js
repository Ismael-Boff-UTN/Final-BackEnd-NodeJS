const roles = require("../models/rol");
const Usuario = require("../models/usuario");
const Categoria = require('../models/categoria');
const Articulo = require('../models/articulo');

//Valida Que El Rol Ingresado Exista En La DB
const esRolValido = async (rol = "") => {
  const exiteRol = await roles.findOne({ rol });
  if (!exiteRol) {
    throw new Error(`El Rol ${rol} no está registrado!`);
  }
};

//Valida Que El Email Ingresado Ya Exista
const esEmailvalido = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El Email ${email} YA ESTÁ registrado!`);
  }
};

const existeIDUsuario = async (id = "") => {
  const existe = await Usuario.findById(id);
  if (!existe) {
    throw new Error(`El ID ${id} No Existe!!`);
  }
};

const existeIDCategoria = async (id = "") => {
  const existe = await Categoria.findById(id);
  if (!existe) {
    throw new Error(`El ID ${id} No Existe!!`);
  }
};

const existeIDArticulo = async (id = "") => {
  const existe = await Articulo.findById(id);
  if (!existe) {
    throw new Error(`El ID ${id} No Existe!!`);
  }
};

module.exports = {
  esRolValido,
  esEmailvalido,
  existeIDUsuario,
  existeIDCategoria,
  existeIDArticulo,
};
