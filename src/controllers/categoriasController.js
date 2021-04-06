const { response } = require("express");
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

const getCategoriasByID = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id);

  res.json({
    msg: `Categoria Obtenida`,
    categoria: categoria,
    
  });
};

const postCategorias = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La Categoria ${nombre}, Ya Existe!`,
    });
  }
  //Si No Existe Se Crea
  const data = {
    nombre,
  };
  const categoria = new Categoria(data);
  //Lo Guardo En La Base
  await categoria.save();
  res.status(201).json({
    msg: "Insertado Con Exito",
    categoria,
  });
};

const putCategorias = async (req, res = response) =>{
    res.json({
        msg: `Categoria Editada`,
      
      });
}

//SoftDelete
const deleteCategorias = async (req, res=response) =>{
    res.json({
        msg: `Categoria Eliminada`,
        
      });
}
module.exports = {
  getCategorias,
  getCategoriasByID,
  postCategorias,
  putCategorias,
  deleteCategorias
};
