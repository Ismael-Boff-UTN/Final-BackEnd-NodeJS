//Imports
const { response } = require("express");
const Detalle = require("../models/detallesPedido");
const Pedido = require("../models/pedido");
const Usuario = require("../models/usuario");
const nodemailer = require("nodeMailer");
const bcryptjs = require("bcrypt");
const { esEmailvalido } = require("../helpers/db-validadores");
const { v4: uuidv4 } = require("uuid");
const config = require("../private/emailData.json");
const emailSend = require("../helpers/emailSender")

//FUNCION GET DE PEDIDOS
const getPedidos = async (req, res = response) => {
  try {
    const { id } = req.params;
    console.log(String(id));
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (String(user._id) === String(id)) {
        user.pedidos.forEach((pedido) => {
            usuariosPedidos.push(pedido);
        });
      }
    });

    pedidos = usuariosPedidos;

    res.status(200).json({
      status: true,
      msg: "Pedidos por usuario",
      size: pedidos.length,
      pedidos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION GET DE COCINERO
const getPedidosCocinero = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          if(pedido.estado == "En preparacion"){
            usuariosPedidos.push(pedido);
          }
        });
      }
    });

    pedidosCoci = usuariosPedidos;

    res.status(200).json({
      status: true,
      msg: "Pedidos Cocinero",
      size: pedidosCoci.length,
      pedidosCoci,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION GET DE DELIVERY
const getPedidosDelivery = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          if(pedido.estado == "Para retirar"){
            usuariosPedidos.push(pedido);
          }
        });
      }
    });

    pedidosDeli = usuariosPedidos;

    res.status(200).json({
      status: true,
      msg: "Pedidos Delivery",
      size: pedidosDeli.length,
      pedidosDeli,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION GET DE CAJA FACTURACION
const getPedidosCajaFacturacion = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          if(pedido.estado == "Preparado"){
            usuariosPedidos.push(pedido);
          }
        });
      }
    });

    pedidosCajaFact = usuariosPedidos;

    res.status(200).json({
      status: true,
      msg: "Pedidos Caja Facturacion",
      size: pedidosCajaFact.length,
      pedidosCajaFact,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION GET DE CAJA ADMICION
const getPedidosCajaAdmision = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          if(pedido.estado == "En aprobacion"){
            usuariosPedidos.push(pedido);
          }
        });
      }
    });

    pedidosCajaAdmi = usuariosPedidos;

    res.status(200).json({
      status: true,
      msg: "Pedidos Caja Admision",
      size: pedidosCajaAdmi.length,
      pedidosCajaAdmi,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION PUT DE LOS PEDIDOS
const putPedidos = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, estado} = req.body;

    //buscamos el usuario con ese pedido
    const usuarios = await Usuario.find({ estado: true });
    var usuarioAModificar = new Usuario;
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          //console.log(pedido._id);
          if(String(pedido._id) === String(_id)){
            usuarioAModificar=user;
          }
        });
      }
    });
    
    var pedidoAFacturar = new Pedido;
    //modificamos el estado
    usuarioAModificar.pedidos.forEach((pedido) => {
      if(String(pedido._id) === String(_id)){
        pedido.estado=estado;
        pedidoAFacturar=pedido;
      }
    });


    //console.log(usuarioAModificar.nombre);
    await Usuario.findByIdAndUpdate(usuarioAModificar._id, usuarioAModificar);

    if(estado == "Facturado"){
      emailSend(usuarioAModificar.nombre, usuarioAModificar.apellido, usuarioAModificar.email , pedidoAFacturar.fecha, pedidoAFacturar.detallesPedido ,pedidoAFacturar.total);
    };

    res.json({
      msg: "Pedido Actualizado Correctamente!",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};



module.exports = {
  getPedidos,
  getPedidosCocinero,
  putPedidos,
  getPedidosDelivery,
  getPedidosCajaFacturacion,
  getPedidosCajaAdmision,
};