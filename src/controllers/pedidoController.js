//Imports
const { response } = require("express");
const Detalle = require("../models/detallesPedido");
const Pedido = require("../models/pedido");
const bcryptjs = require("bcrypt");
const { esEmailvalido } = require("../helpers/db-validadores");
const { v4: uuidv4 } = require("uuid");


//FUNCION GET DE PEDIDOS
const getPedidos = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Pedidos
    //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;
    //estado : true, Retorna solo los Pedidos que no esten softdeleteados
    const pedidos = await Pedido.find({ porCompletar: true })
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      msg: "Lista De Pedidos",
      totalRegistros: pedidos.length,
      pedidos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION POST DEL PEDIDO
const postPedidos = async (req, res = response) => {
  try {
    const { estado, tipoEnvio, fecha } = req.body;
    const detalles = req.body.detalles;
    const usuario = req.usuario;

    var totalPrecio = 0;
    detalles.forEach((item) => {
      totalPrecio += item.precioUnitario * item.cantidad;
    });

    const pedido = new Pedido({
      estado,
      tipoEnvio,
      fecha,
      detallesPedido: req.body.detalles,
      total: totalPrecio,
      nombreCliente: usuario.nombre + " " + usuario.apellido,
      telefono: usuario.telefono,
      domicilioEnvio: usuario.domicilio,
    });

    //Guardo El Usuario
    await pedido.save();
    res.json({
        status: true,
        msg: "Insertado Correctamente!",
        pedido,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION PUT DEL USUARIO
const putPedidos = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const pedido = await Pedido.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Pedido Actualizado Correctamente!",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};


//Añadir Detalle a Pedido
const addDetallePedido = async (req, res = response) => {
  try {
    const { nombre, cantidad, precioUnitario } = req.body;
    var idp = uuidv4();
    const pedido = req.pedido;


    const detalle = new Detalle({
      nombre,
      cantidad,
      precioUnitario,

    });

    const { id } = req.params;

    await Pedido.findByIdAndUpdate(id, { $push: { detallesPedido: detalle } });
    res.status(200).json({
      msg: "Detalle Agregado Correctamente!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getPedidos,
  postPedidos,
  putPedidos,
  addDetallePedido,
};