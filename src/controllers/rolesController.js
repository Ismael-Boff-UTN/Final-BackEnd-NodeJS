const { response } = require("express");
const Rol = require("../models/rol");

const getRoles = async (req, res = response) => {
  try {
    const { limite = null, desde = 0 } = req.query;

    const roles = await Rol.find().skip(Number(desde)).limit(Number(limite));
    res.status(200).json({
      status: true,
      msg: "Roles Obtenidos",
      totalRegistros: roles.length,
      roles,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const getRolByID = async (req, res = response) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findById(id);

    res.status(200).json({
      status: true,
      msg: `Rol Obtenido`,
      rol,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const postRol = async (req, res = response) => {
  try {
    const { rol } = req.body;

    const rol2 = rol.toUpperCase();

    const role = new Rol({
      rol: rol2,
    });

    await role.save();
    res.status(200).json({
      status: true,
      msg: "Rol Creado",
      role,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const putRol = async (req, res = response) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      status: true,
      msg: "Articulo Actualizado",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//Pediente xq rol no tiene el campo estado
const deleteRol = async (req, res = response) => {
  try {
    const { id } = req.params;

    const ingredienteEncontrado = await Ingrediente.findById(id);

    if (ingredienteEncontrado.estado === true) {
      const ingrediente = await Ingrediente.findByIdAndUpdate(id, {
        estado: false,
      });

      res.status(200).json({
        status: true,
        msg: `Ingrediente : ${ingrediente.denominacion}, Eliminado!`,
      });
    } else {
      const ingrediente = await Ingrediente.findByIdAndUpdate(id, {
        estado: true,
      });

      res.status(200).json({
        status: true,
        msg: `Ingrediente : ${ingrediente.denominacion}, Reestrablecido!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getRoles,
  getRolByID,
  postRol,
  putRol,
  deleteRol,
};
