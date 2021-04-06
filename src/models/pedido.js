const { Schema, model } = require("mongoose");

const PedidoSchema = Schema({
  fecha: {
    type: Date,
    required: [true, "La Fecha Es Requerida"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  horaEstimadaFin:{
      type : Date,
      required:[true, "La Hora Estimada De Entrega Es Requerida"]
  },
  tipoEnvio:{
      type: String,
      required:[true, "El Tipo De Envio Es Requerido"]
  },
  total:{
      type: Number,
      required: [true, "El Total Es Requerido"]
  },
  detallesPedido:[{
      type: Schema.Types.Mixed,
      ref: 'detallespedido'
  }]
});

module.exports = model("pedido", PedidoSchema);
