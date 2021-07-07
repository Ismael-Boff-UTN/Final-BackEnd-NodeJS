const { response } = require("express");
const { subirImagenCloudinary } = require("../helpers/subir-archivo");
const Articulo = require("../models/articulo");

const getArticulos = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
    //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;
    //estado : true, Retorna solo los articulos que no esten softdeleteados
    const articulos = await Articulo.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      status: true,
      msg: "Articulos Obtenidos",
      totalRegistros: articulos.length,
      articulos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getArticulosAdmin = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
    //Ej. http://localhost:4000/api/articulos?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;

    const articulos = await Articulo.find()
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      status: true,
      msg: "Articulos Obtenidos",
      totalRegistros: articulos.length,
      articulos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const getArticuloByID = async (req, res = response) => {
  try {
    const { id } = req.params;

    const articulo = await Articulo.findById(id);

    res.status(200).json({
      status: true,
      msg: `Articulo Obtenido`,
      articulo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const postArticulo = async (req, res = response) => {
  try {
    const {
      tiempoEstimadoCocina,
      denominacion,
      precioVenta,
      imagen,
      esManufacturado,
      categoria,
    } = req.body;

    const imgCloudinary = await subirImagenCloudinary(
      imagen,
      "BuenSabor/Articulos_Pictures"
    );

    const usuario = req.usuario;
    const creadoPor = {
      usuario: usuario.nombre + " " + usuario.apellido,
      id: usuario._id,
      fechaCreacion: new Date(),
    };

    if (esManufacturado === true) {
      const detalles = {
        articuluManufacturadoDetalle: req.body.articuluManufacturadoDetalle,
      };
      precioVentaSumado = 0;
      detalles.articuluManufacturadoDetalle.forEach((insumo) => {
        precioVentaSumado += insumo.precioVenta;
      });
      
      const articulo = new Articulo({
        tiempoEstimadoCocina,
        denominacion,
        precioVenta: precioVentaSumado,
        imagen: imgCloudinary,
        articuluManufacturadoDetalle: req.body.articuluManufacturadoDetalle,
        esManufacturado,
        creadoPor,
        categoria,
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
        imagen: imgCloudinary,
        esManufacturado,
        creadoPor,
        categoria,
      });

      await articulo.save();
      res.status(200).json({
        status: true,
        msg: "Articulo Creado",
        articulo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const putArticulo = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      tiempoEstimadoCocina,
      denominacion,
      precioVenta,
      imagen,
      esManufacturado,
      categoria,
    } = req.body;

    const imgCloudinary = await subirImagenCloudinary(
      imagen,
      "BuenSabor/Articulos_Pictures"
    );

    const data = {
      tiempoEstimadoCocina,
      denominacion,
      precioVenta,
      imagen: imgCloudinary,
      articuluManufacturadoDetalle: req.body.articuluManufacturadoDetalle,
      esManufacturado,
      categoria,
    };

    await Articulo.findByIdAndUpdate(id, data);

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
const deleteArticulo = async (req, res = response) => {
  try {
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
        msg: `Articulo : ${articulo.denominacion}, Reestablecido!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
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
