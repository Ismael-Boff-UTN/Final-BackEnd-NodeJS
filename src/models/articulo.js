const { Schema, model } = require("mongoose");

const ArticuloManufacturadoSchema = Schema({
  denominacion: {
    type: String,
    required: [true, "La Denominación Es Requerida"],
  },
  precioVenta: {
    type: Number,
    required: false
  },
  imagen: {
    type: String,
    required: [true, "La Imagen Es Requerida"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: new Date(),
  },
  tiempoEstimadoCocina: {
    type: String,
    required: [true, "El Tiempo De Cocción Es Requerido"],
  },
  esManufacturado: {
    type: Boolean,
    required: [
      true,
      "Se Necesita Declarar El Tipo De Articulo! (Manufacturado/SI-NO)",
    ],
  },
  articuluManufacturadoDetalle: [
    {
      type: Schema.Types.Mixed,
      ref: "articuloManufacturadoDetalle",
      required: false,
    },
  ],
  creadoPor: {
    type: Object,
    default: true,
  },
  cantidadVendido: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: String,
    required: [false, "La Categoria Es Requerida"],
  },
});

module.exports = model("articulo", ArticuloManufacturadoSchema);
