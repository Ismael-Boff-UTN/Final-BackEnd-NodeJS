const { Schema, model } = require("mongoose");

const ArticuloManufacturadoDetalleSchema = Schema({
  denominacionIngrediente: {
    type: String,
    required: [true, "La Denominacion Es Requerida"],
    default: 1,
  },
  cantidad: {
    type: Number,
    required: [true, "La Cantidad Es Requerida"],
    default: 1,
  },
  unidadMedida: {
    type: String,
    required: [true, "La Unidad De Medida Es Requerida"],
    default: "gr",
  },
});

module.exports = model(
  "articuloManufacturadoDetalle",
  ArticuloManufacturadoDetalleSchema
);
