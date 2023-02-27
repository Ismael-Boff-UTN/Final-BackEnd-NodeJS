const { response } = require("express");
const Articulo = require("../models/articulo");
const Usuario = require("../models/usuario");

//Ranking comidas más pedidas en un periodo de tiempo determinado
const getArtiuclosMasVendidos = async (req, res = response) => {


  try {
    const articulos = await Articulo.find({ estado: true })
      .sort({ cantidadVendido: -1 })
      .limit(Number(10));

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

//Ranking comidas más pedidas en un periodo de tiempo determinado
const getArtiuclosMasVendidosByDate = async (req, res = response) => {
  try {
    //console.log(req.query)
    const { fechaInicial = null, fechaFinal = null } = req.query;



    const articulos = await Articulo.find({
      estado: true,
      lastSale: { $gte: fechaInicial },
      lastSale: { $lte: fechaFinal }

    })
      .sort({ cantidadVendido: -1 })
    //.limit(Number(10));

    res.status(200).json({
      status: true,

      cantidad: articulos.length,
      articulos


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

    usuariosPedidos;

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
    const { fechaInicial = null, fechaFinal = null } = req.query;
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          usuariosPedidos.push(pedido);
        });
      }
    });
    //Filtrar Pedidos Entre 2 Fechas
    var ed = Date.parse(fechaFinal);
    var sd = Date.parse(fechaInicial);

    const result = usuariosPedidos.filter((pedido) => {
      var time = Date.parse(pedido.fecha);

      return sd < time && time < ed;
    });

    //TODO
    //Recorrer El Array De Pedidos De Cada Usuario, Sumar Totales De Cada Pedido
    var total = 0;

    await result.forEach((pedido) => {
      total += pedido.total;
    });
    //return total

    //TODO
    //Obtener costos
    totalRecaudacion = total;
    totalGanancias = total / 2; // Total - 50% Ej. Si Total = 100, 50 son ganancias 50 son para volver a comprar el articulo

    res.status(200).json({
      status: true,
      msg: "Ganancias",
      resultados: `${result.length}, Pedidos Entre ${fechaInicial} y ${fechaFinal}`,
      //result,
      totalGanancias,
      totalRecaudacion,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};


const getRecaudacionesDelDia = async (req, res = response) => {
  try {
    const { fechaInicial = null, fechaFinal = null } = req.query;
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          usuariosPedidos.push(pedido);
        });
      }
    });
    //Filtrar Pedidos Entre 2 Fechas
    var ed = new Date(fechaFinal);
    var sd = new Date(fechaInicial);

    const result = usuariosPedidos.filter((pedido) => {
      var time = new Date(pedido.fecha).getTime();
      return sd > time && time < ed;
    });

    //TODO
    //Recorrer El Array De Pedidos De Cada Usuario, Sumar Totales De Cada Pedido
    var total = 0;

    await result.forEach((pedido) => {
      //console.log("el tiempo es " + pedido)
      total += pedido.total;
    });
    //return total

    res.status(200).json({
      status: true,
      msg: "Recaudaciones",
      resultados: `${result.length}, Pedidos Entre ${fechaInicial} y ${fechaFinal}`,
      result,
      totalRecaudacion: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//Ingresos (recaudaciones) por períodos de tiempo. Diario / Mensual
const getRecaudaciones = async (req, res = response) => {
  try {
    //console.log(req.query)
    const { fechaInicial = null, fechaFinal = null } = req.query;
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          usuariosPedidos.push(pedido);
        });
      }
    });
    //Filtrar Pedidos Entre 2 Fechas
    var ed = Date.parse(fechaFinal);
    var sd = Date.parse(fechaInicial);
    //console.log("fecha del front ",fechaInicial + " / " + fechaFinal)

    const result = usuariosPedidos.filter((pedido) => {
      var time = Date.parse(pedido.fecha);
      //console.log("el tiempo es " + time)
      return sd < time && time < ed;
    });

    //TODO
    //Recorrer El Array De Pedidos De Cada Usuario, Sumar Totales De Cada Pedido
    var total = 0;

    await result.forEach((pedido) => {
      //console.log("el tiempo es " + pedido)
      total += pedido.total;
    });
    //return total
    totalGanancias = total / 2;

    res.status(200).json({
      status: true,
      msg: "Recaudaciones",
      resultados: `${result.length}, Pedidos Entre ${fechaInicial} y ${fechaFinal}`,
      result,
      totalGanancias,
      totalRecaudacion: total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getUltimosPedidos = async (req, res = response) => {
  try {
    const usuarios = await Usuario.find({ estado: true });
    const usuariosPedidos = []; //Array Con Todos Los Pedidos, De Todos Los Usuarios
    await usuarios.forEach((user) => {
      if (user.pedidos.length > 0) {
        user.pedidos.forEach((pedido) => {
          usuariosPedidos.push(pedido);
        });
      }
    });



    ultimosPedidos = await usuariosPedidos.sort((a, b) => Date.parse(b.fecha) - Date.parse(a.fecha))




    res.status(200).json({
      status: true,
      msg: "Ultimos Pedidos",
      size: ultimosPedidos.length,
      ultimosPedidos,
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
  getUltimosPedidos,
  getRecaudacionesDelDia,
  getArtiuclosMasVendidosByDate
};
