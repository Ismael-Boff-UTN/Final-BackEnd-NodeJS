const { Schema, model } = require("mongoose");

const IngredienteSchema = Schema({
  denominacion: {
    type: String,
    required: [true, "La Denominación Es Requerida"],
  },
  precioCompra: {
    type: Number,
    required: [true, "El Precio Es Requerido"],
  },
  precioVenta: {
    type: Number,
    required: [true, "El Precio De Venta Es Requerido"],
  },
  stockActual: {
    type: Number,
    required: [true, "El Stock Actual Es Requerido"],
  },
  stockMinimo: {
    type: Number,
    required: [true, "El Stock Minimo Es Requerido"],
  },
  unidadMedida: {
    type: String,
    required: [true, "La Unidad De Medida Es Requerida"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  creadoPor: {
    type: Object,
    default: true,
  },
  editadoPor: {
    type: Object,
    default: true,
  },
});

module.exports = model("ingrediente", IngredienteSchema);
