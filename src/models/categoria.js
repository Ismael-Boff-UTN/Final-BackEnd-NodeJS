const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
  img: {
    type: String,
    required : [true, "La Imagen Es Requerida"],
    //default: "https://firmwareoficial.com/wp-content/uploads/2020/07/unknown-.png"
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("categoria", CategoriaSchema);
