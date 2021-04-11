const { response } = require("express");
const ArticuloManufacturado = require("../models/articuloManufacturado");

const getArticulos = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
  //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los articulos que no esten softdeleteados
  const articulos = await ArticuloManufacturado.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    status: true,
    msg: "Articulos Obtenidos",
    totalRegistros: articulos.length,
    articulos,
  });
};
const getArticuloByID = async (req, res = response) => {
  const { id } = req.params;

  const articulo = await ArticuloManufacturado.findById(id);

  res.json({
    status: true,
    msg: `Articulo Obtenido`,
    articulo,
  });
};

const postArticulo = async (req, res = response) => {
  const { tiempoEstimadoCocina, denominacion, precioVenta, imagen } = req.body;

  const usuario = req.usuario;

  const articulo = new ArticuloManufacturado({
    tiempoEstimadoCocina,
    denominacion,
    precioVenta,
    imagen,
    articuluManufacturadoDetalle: req.body.articuluManufacturadoDetalle,
  });

  const creadoPor = {
    usuario: usuario.nombre + " " + usuario.apellido,
    id: usuario._id,
    profilePicture: usuario.img,
  };
  await articulo.save();
  res.status(200).json({
    status: true,
    msg: "Articulo Creado",
    articulo,
    creadoPor,
  });
};
const putArticulo = async (req, res = response) => {
  const { id } = req.params;
  res.json({
    status: true,
    msg: "Articulo Actualizado",
    id,
  });
};
const deleteArticulo = async (req, res = response) => {
  const { id } = req.params;

  const articulo = await ArticuloManufacturado.findByIdAndUpdate(id, {
    estado: false,
  });
  const usuario = req.usuario;
  const eliminadoPor = {
    usuario: usuario.nombre + " " + usuario.apellido,
    id: usuario._id,
    profilePicture: usuario.img,
    fechaEliminacion: new Date(),
  };
  res.status(200).json({
    status: true,
    msg: `Articulo : ${articulo.denominacion}, Eliminado!`,
    eliminadoPor,
  });
};

module.exports = {
  getArticulos,
  getArticuloByID,
  postArticulo,
  putArticulo,
  deleteArticulo,
};
