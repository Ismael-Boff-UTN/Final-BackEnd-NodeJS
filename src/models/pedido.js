const { Schema, model } = require("mongoose");

const PedidoSchema = Schema({
  fecha: {
    type: Date,
    default: new Date(),
  },
  numero: {
    type: String,
    require: true,
  },
  estado: {
    type: String,
    required: true,
  },
  domicilioEnvio: {
    type: Schema.Types.Mixed,
    ref: "domicilio",
    required: [false, "El Domicilio Es Requerido"],
    default: { localidad: "", calle: "", numero: "" },
  },
  telefono: {
    type: Number,
    require: true,
  },
  nombreCliente: {
    type: String,
    required: true,
  },
  tipoEnvio: {
    type: String,
    required: [true, "El Tipo De Envio Es Requerido"],
  },
  total: {
    type: Number,
    required: [false, "El Total Es Requerido"],
  },
  porCompletar: {
    type: Boolean,
    default: true,
  },
  detallesPedido: [
    {
      type: Schema.Types.Mixed,
      ref: "detallespedido",
    },
  ],
});

module.exports = model("pedido", PedidoSchema);
