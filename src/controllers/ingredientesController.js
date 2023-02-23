const { response } = require("express");
const Ingrediente = require("../models/ingrediente");

const getIngredientes = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Articulos
    //Ej. http://localhost:4000/api/ingredientes?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;

    const ingredientes = await Ingrediente.find()
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      status: true,
      msg: "Ingredientes Obtenidos",
      totalRegistros: ingredientes.length,
      ingredientes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const getIngredienteByID = async (req, res = response) => {
  try {
    const { id } = req.params;

    const ingrediente = await Ingrediente.findById(id);

    res.status(200).json({
      status: true,
      msg: `Ingrediente Obtenido`,
      ingrediente,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const postIngrediente = async (req, res = response) => {
  try {
    const {
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      esIngrediente,
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
      precioVenta: precioCompra * 2,
      stockActual,
      stockMinimo,
      unidadMedida,
      creadoPor,
      esIngrediente,
    });

    await ingrediente.save();
    res.status(200).json({
      status: true,
      msg: "Ingrediente Creado",
      ingrediente,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const putIngrediente = async (req, res = response) => {
  try {
    const { id } = req.params;
    const {
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
      esIngrediente,
    } = req.body;

    const usuario = req.usuario;
    const editadoPor = {
      usuario: usuario.nombre + " " + usuario.apellido,
      id: usuario._id,
      fechaEdicion: new Date(),
    };

    const data = {
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
      editadoPor,
      esIngrediente,
    };

    const ingrediente = await Ingrediente.findByIdAndUpdate(id, data);
    res.status(200).json({
      status: true,
      msg: "Ingrediente Actualizado Correctamente!",
      ingrediente,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//put dedescuento para comprar
const putIngredienteDescontar = async (req, res = response) => {
  console.log(req);
  try {
    console.log(req)
    const {
      _id,
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
      esIngrediente,
    } = req.body;

    const data = {
      _id,
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
      esIngrediente,
    };

    const ingrediente = await Ingrediente.findByIdAndUpdate(data._id, data);
    res.status(200).json({
      status: true,
      msg: "Ingrediente Actualizado Correctamente!",
      ingrediente,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const deleteIngrediente = async (req, res = response) => {
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
  getIngredientes,
  getIngredienteByID,
  postIngrediente,
  putIngrediente,
  deleteIngrediente,
  putIngredienteDescontar,
};
