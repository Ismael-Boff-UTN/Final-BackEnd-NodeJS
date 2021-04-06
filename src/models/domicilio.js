const { Schema, model } = require("mongoose");

const DomicilioSchema = Schema(
    {
  calle: {
    type: String,
    required: [false, "La Calle Es Requerida"],
    default: ''
  },
  numero: {
    type: String,
    required: [false, "El Numero Es Requerido"],
    default: ''
  },
  localidad: {
    type: String,
    required: [false, "La Localidad Es Requerida"],
    default: ''
  },
});

module.exports = model("domicilio", DomicilioSchema);
