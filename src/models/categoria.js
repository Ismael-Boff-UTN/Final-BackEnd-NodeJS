const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("categoria", CategoriaSchema);
