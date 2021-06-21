const { response } = require("express");
const Ingrediente = require("../models/ingrediente");

const getIngredientes = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
  //Ej. http://localhost:4000/api/ingredientes?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los articulos que no esten softdeleteados
  const ingredientes = await Ingrediente.find()
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    status: true,
    msg: "Ingredientes Obtenidos",
    totalRegistros: ingredientes.length,
    ingredientes,
  });
};
const getIngredienteByID = async (req, res = response) => {
  const { id } = req.params;

  const ingrediente = await Ingrediente.findById(id);

  res.json({
    status: true,
    msg: `Ingrediente Obtenido`,
    ingrediente,
  });
};

const postIngrediente = async (req, res = response) => {
  const {
    denominacion,
    precioCompra,
    precioVenta,
    stockActual,
    stockMinimo,
    unidadMedida,
  } = req.body;

  const usuario = req.usuario;
  const creadoPor = {
    usuario: usuario.nombre + " " + usuario.apellido,
    id: usuario._id,
    fechaCreacion: new Date(),
  };

  const ingrediente = new Ingrediente({
    denominacion,
    precioCompra,
    precioVenta,
    stockActual,
    stockMinimo,
    unidadMedida,
    creadoPor,
  });

  await ingrediente.save();
  res.status(200).json({
    status: true,
    msg: "Ingrediente Creado",
    ingrediente,
  });
};
const putIngrediente = async (req, res = response) => {
  const { id } = req.params;
  const {
    denominacion,
    precioCompra,
    precioVenta,
    stockActual,
    stockMinimo,
    unidadMedida,
    estado,
  } = req.body;

  const ingrediente = await Ingrediente.findByIdAndUpdate(id, req.body);
  res.json({
    msg: "Ingrediente Actualizado Correctamente!",
    ingrediente,
  });
};
const deleteIngrediente = async (req, res = response) => {
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
};

module.exports = {
  getIngredientes,
  getIngredienteByID,
  postIngrediente,
  putIngrediente,
  deleteIngrediente,
};
