const { Schema, model } = require("mongoose");

const ArticuloManufacturadoSchema = Schema({
  tiempoEstimadoCocina: {
    type: String,
    required: [true, "El Tiempo De Cocción Es Requerido"],
  },
  denominacion: {
    type: String,
    required: [true, "La Denominación Es Requerida"],
  },
  precioVenta: {
    type: Number,
    required: [true, "El Precio De Venta Es Requerido"],
  },
  imagen: {
    type: String,
    required: [true, "La Imagen Es Requerida"],
  },
  estado: {
    type: Boolean,
    default : true
  },
  fechaCreacion: {
    type: Date,
    default : new Date()
  },
  articuluManufacturadoDetalle: [
    {
      type: Schema.Types.Mixed,
      ref: "articuloManufacturadoDetalle",
      required: true, //Por El Momento
    },
  ],
});

module.exports = model("articulo", ArticuloManufacturadoSchema);
