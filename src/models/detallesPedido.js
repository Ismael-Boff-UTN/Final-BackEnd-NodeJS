const { Schema, model } = require("mongoose");

const DetallesPedidoSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre Es Requerido"],
  },
  cantidad: {
    type: Number,
    required: [true, "La Cantidad Minima Es 1"],
  },
  precioUnitario: {
    type: Number,
    required: [true, "El Precio Del Articulo Es Requerido"],
  },
});

module.exports = model("detallespedido", DetallesPedidoSchema);
