const { response } = require("express");

const getDefault = async (__, res = response) => {
  try {
    res.json({
      msg: "Bienvenido A La API De El Buen Sabor!",
      description: "Esta Es Una API Para La Catedra De Laboratorio IV - 2021",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

module.exports = {
  getDefault,
};
