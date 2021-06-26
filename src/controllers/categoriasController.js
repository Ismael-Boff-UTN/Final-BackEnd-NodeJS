const { response } = require("express");
const { subirImagenCloudinary } = require("../helpers/subir-archivo");
const Categoria = require("../models/categoria");

//FUNCION GET DE CATEGORIAS
const getCategorias = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
  //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los usuarios que no esten softdeleteados
  const categorias = await Categoria.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    msg: "Lista De Categorias",
    totalRegistros: categorias.length,
    categorias: categorias,
  });
};

const getCategoriasAdmin = async (req, res = response) => {
  //Si No Se Pasa Un Limite (null) Retorna TODOS Los Usuarios
  //Ej. http://localhost:4000/api/usuarios?limite=5&desde=4
  const { limite = null, desde = 0 } = req.query;
  //estado : true, Retorna solo los usuarios que no esten softdeleteados
  const categorias = await Categoria.find()
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({
    msg: "Lista De Categorias",
    totalRegistros: categorias.length,
    categorias: categorias,
  });
};

const getCategoriasByID = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id);

  res.json({
    msg: `Categoria Obtenida`,
    categoria: categoria,
  });
};

const postCategorias = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    const { img } = req.body;

    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
      return res.status(400).json({
        msg: `La Categoria ${nombre}, Ya Existe!`,
      });
    }

    //Se Sube La Imagen A Cloudinary
    const imgCloudinary = await subirImagenCloudinary(
      img,
      "BuenSabor/Categorias_Pictures"
    );

    data = {
      nombre,
      img: imgCloudinary,
    };

    const categoria = new Categoria(data);
    //Lo Guardo En La Base
    await categoria.save();
    res.status(201).json({
      msg: "Insertado Con Exito",
      categoria,
    });
  } catch (error) {
    //console.log(error);
  }
};

const putCategorias = async (req, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const { img } = req.body;

  const imgCloudinary = await subirImagenCloudinary(
    img,
    "BuenSabor/Categorias_Pictures"
  );
  const data = {
    nombre,
    img: imgCloudinary,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, data);
  res.json({
    status: true,
    msg: "Categoria Actualizada Correctamente!",
    categoria,
  });
};

//SoftDelete
const deleteCategorias = async (req, res = response) => {
  const { id } = req.params;
  const categoriaEncontrado = await Categoria.findById(id);

  if (categoriaEncontrado.estado === true) {
    const categoria = await Categoria.findByIdAndUpdate(id, {
      estado: false,
    });

    res.status(200).json({
      status: true,
      msg: `Categoria : ${categoria.nombre}, Eliminadoa!`,
    });
  } else {
    const categoria = await Categoria.findByIdAndUpdate(id, {
      estado: true,
    });

    res.status(200).json({
      status: true,
      msg: `Categoria : ${categoria.nombre}, Reestrablecida!`,
    });
  }
};
module.exports = {
  getCategorias,
  getCategoriasAdmin,
  getCategoriasByID,
  postCategorias,
  putCategorias,
  deleteCategorias,
};
