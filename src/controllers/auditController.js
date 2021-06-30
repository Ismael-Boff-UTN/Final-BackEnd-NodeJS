const { response } = require("express");
const Articulo = require("../models/articulo");
const Usuario = require("../models/usuario");

//Ranking comidas más pedidas en un periodo de tiempo determinado
const getArtiuclosMasVendidos = async (req, res = response) => {
  try {
    const articulos = await Articulo.find({ estado: true })
      .sort({ cantidadVendido: -1 })
      .limit(Number(5));

    res.status(200).json({
      status: true,
      msg: "Articulos Mas Vendidos Obtenidos",
      totalRegistros: articulos.length,
      articulos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//Cantidad de pedidos agrupados por cliente en un determinado
//periodo de tiempo.
const getPedidosUsuarios = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = [];
    await usuarios.forEach((user) => {
      if (user.pedidos.length === 0) {
        usuariosPedidos.push({ pedidos: "Sin Pedidos", usuario: user.nombre });
      } else {
        usuariosPedidos.push({ pedidos: user.pedidos, usuario: user.nombre });
      }
    });

    res.status(200).json({
      status: true,
      msg: "Pedidos Por Usuario",
      usuariosPedidos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//Monto de Ganancia en un periodo de tiempo (ventas – costos)
const getGanancias = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = [];
    await usuarios.forEach((user) => {
      if (!user.pedidos.length === 0) {
        usuariosPedidos.push({ pedidos: user.pedidos, usuario: user.nombre });
      }
    });
    //TODO
    //Recorrer El Array De Pedidos De Cada Usuario, Sumar Totales De Cada Pedido
    //Hacer Y Recorrer Array De Ingredientes De Cada Articulo De Cada Pedido, Sumar Precio de Venta
    //return (Ventas - Costos);

    res.status(200).json({
      status: true,
      msg: "Ganancias",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
//Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
const getRecaudaciones = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = [];
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        usuariosPedidos.push({ pedidos: user.pedidos, usuario: user.nombre });
      }
    });

    //TODO
    //Recorrer El Array De Pedidos De Cada Usuario, Sumar Totales De Cada Pedido
    var total = 0;

    await usuariosPedidos.forEach((pedido) => {
      pedido.pedidos.forEach((p) => {
        total += p.total;
      });
    });
    //return total

    res.status(200).json({
      status: true,
      msg: "Recaudaciones",

      totalRecaudacion : total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getArtiuclosMasVendidos,
  getPedidosUsuarios,
  getGanancias,
  getRecaudaciones,
};
