const { response } = require("express");
const Articulo = require("../models/articulo");

const getArtiuclosMasVendidos = async (req, res = response) => {
  try {
    const articulos = await Articulo.find({ estado: true }).sort({cantidadVendido : -1}).limit(Number(5));

   

    res.status(200).json({
      status: true,
      msg: "Articulos Mas Vendidos Obtenidos",
      totalRegistros: articulos.length,
      articulos
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = {
  getArtiuclosMasVendidos,
};
