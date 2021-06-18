const { response } = require("express");
const Articulo = require("../models/articulo");

const getArticulos = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
  //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los articulos que no esten softdeleteados
  const articulos = await Articulo.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    status: true,
    msg: "Articulos Obtenidos",
    totalRegistros: articulos.length,
    articulos,
  });
};

const getArticulosAdmin = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
  //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los articulos que no esten softdeleteados
  const articulos = await Articulo.find()
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

  const articulo = await Articulo.findById(id);

  res.json({
    status: true,
    msg: `Articulo Obtenido`,
    articulo,
  });
};

const postArticulo = async (req, res = response) => {
  const {
    tiempoEstimadoCocina,
    denominacion,
    precioVenta,
    imagen,
    esManufacturado,
  } = req.body;

  const usuario = req.usuario;
  const creadoPor = {
    usuario: usuario.nombre + " " + usuario.apellido,
    id: usuario._id,
    fechaCreacion: new Date(),
  };

  if (esManufacturado === true) {
    const articulo = new Articulo({
      tiempoEstimadoCocina,
      denominacion,
      precioVenta,
      imagen,
      articuluManufacturadoDetalle: req.body.articuluManufacturadoDetalle,
      esManufacturado,
      creadoPor,
    });

    await articulo.save();
    res.status(200).json({
      status: true,
      msg: "Articulo Creado",
      articulo,
    });
  } else {
    const articulo = new Articulo({
      tiempoEstimadoCocina,
      denominacion,
      precioVenta,
      imagen,
      esManufacturado,
      creadoPor,
    });

    await articulo.save();
    res.status(200).json({
      status: true,
      msg: "Articulo Creado",
      articulo,
    });
  }
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

  const articuloEncontrado = await Articulo.findById(id);

  if (articuloEncontrado.estado === true) {
    const articulo = await Articulo.findByIdAndUpdate(id, {
      estado: false,
    });

    res.status(200).json({
      status: true,
      msg: `Articulo : ${articulo.denominacion}, Eliminado!`,
    });
  } else {
    const articulo = await Articulo.findByIdAndUpdate(id, {
      estado: true,
    });

    res.status(200).json({
      status: true,
      msg: `Articulo : ${articulo.denominacion}, Reestrablecido!`,
    });
  }
};

module.exports = {
  getArticulos,
  getArticulosAdmin,
  getArticuloByID,
  postArticulo,
  putArticulo,
  deleteArticulo,
};
