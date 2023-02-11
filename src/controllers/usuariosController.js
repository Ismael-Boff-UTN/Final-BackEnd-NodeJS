//Imports
const { response } = require("express");
const Usuario = require("../models/usuario");
const Pedido = require("../models/pedido");
const Ingredientes = require("../models/ingrediente");
const bcryptjs = require("bcrypt");
const { esEmailvalido } = require("../helpers/db-validadores");
const { v4: uuidv4 } = require("uuid");

//FUNCION GET DE USUARIOS
const getUsuarios = async (req, res = response) => {
  try {
    //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
    //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
    const { limite = null, desde = 0 } = req.query;
    //estado : true, Retorna solo los usuarios que no esten softdeleteados
    const usuarios = await Usuario.find({ estado: true })
      .skip(Number(desde))
      .limit(Number(limite));
    res.status(200).json({
      msg: "Lista De Usuarios",
      totalRegistros: usuarios.length,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION POST DEL USUARIO
const postUsuarios = async (req, res = response) => {
  try {
    const { nombre, apellido, email, password, rol, telefono } = req.body;

    const usuario = new Usuario({
      nombre,
      email,
      password,
      rol,
      apellido,
      telefono,
    });

    let usuarioBuscar = await Usuario.findOne({ email });

    //Se Valida Si El User Existe
    if (usuarioBuscar) {
      let usuarioBuscar = await Usuario.findOne({ email });

      //Si Ya Habia Logueado Con Google Solo Se Actualiza Password Y Telefono
      if (usuarioBuscar.google) {
        let id = usuarioBuscar._id;
        const salt = bcryptjs.genSaltSync();
        const passwordEnc = await bcryptjs.hashSync(password, salt);
        await Usuario.findByIdAndUpdate(id, {
          password: passwordEnc,
          telefono,
        });
        res.json({
          status: true,
          msg: "Existia Con Google!",
        });
      } else {
        //Si Existe usuario con mismo correo pero google en false
        res.json({
          status: false,
          msg: "Correo Ya Existe",
        });
      }
    } else if (!usuarioBuscar) {//Si No Existia Y No tenia Google Se Crea de 0
      //Encriptar Contraseña
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
      //Guardo El Usuario
      await usuario.save();
      res.json({
        status: true,
        msg: "Insertado Correctamente!",
        usuario,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

//FUNCION PUT DEL USUARIO
const putUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
      //Encriptar Contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      msg: "Usuario Actualizado Correctamente!",
      id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const deleteUsuarios = async (req, res = response) => {
  try {
    const { id } = req.params;

    const usuarioEncontrado = await Usuario.findById(id);

    if (usuarioEncontrado.estado === true) {
      const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false,
      });

      res.status(200).json({
        status: true,
        msg: `Usuario : ${usuario.nombre}, Eliminado!`,
      });
    } else {
      const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: true,
      });

      res.status(200).json({
        status: true,
        msg: `Usuario : ${usuario.nombre}, Reestrablecido!`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const putIngredienteDescontar = async (req) => {
  try {
    const {
      _id,
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
    } = req;

    const data = {
      _id,
      denominacion,
      precioCompra,
      precioVenta,
      stockActual,
      stockMinimo,
      unidadMedida,
      estado,
    };

    await Ingredientes.findByIdAndUpdate(data._id, data);
  } catch (error) {
    console.log(error);
  }
};

//Añadir Pedido a Usuario
const addPedidoUsuario = async (req, res = response) => {
  try {
    //console.log(req.body)
    const { id } = req.params;
    const { tipoPago, tipoEnvio, domicilio} = req.body;
    const detalles = req.body.items;
    var idp = uuidv4();
    const usuario =  await Usuario.findByIdAndUpdate(id);
    const ingredientes = await Ingredientes.find({ estado: true });

    var totalPrecio = 0;
    detalles.forEach((item) => {
      totalPrecio += item.precioUnitario * item.cantidad;
    });

    if(tipoEnvio=="Retiro"){
      totalPrecio = totalPrecio - (totalPrecio*0.10);
    }

    const pedido = new Pedido({
      estado: "En aprobacion",
      tipoEnvio,
      tipoPago,
      detallesPedido: req.body.items,
      total: totalPrecio,
      numero: idp,
      nombreCliente: usuario.nombre + " " + usuario.apellido,
      telefono: usuario.telefono,
      domicilioEnvio: domicilio,
    });

    //descontamos stock
    detalles.forEach((art) => {
      if(art.articulo.esManufacturado==true){
        art.articulo.articuluManufacturadoDetalle.forEach((item) => {
          var ingredienteAModificar = new Ingredientes;
          ingredientes.forEach((ing) => {
              if (String(ing._id) === String(item.ingredient._id)) {
                  ingredienteAModificar=ing
                  ingredienteAModificar.stockActual=ingredienteAModificar.stockActual-(item.cantidad*art.cantidad);
                  putIngredienteDescontar(ingredienteAModificar);   
              }
          });
        });
      }
    });

    await Usuario.findByIdAndUpdate(id, { $push: { pedidos: pedido } });

    res.status(200).json({
      msg: "Pedido Agregado Correctamente!",
      numero: pedido.numero,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  deleteUsuarios,
  addPedidoUsuario,
};
