const { Schema, model } = require("mongoose");

const ArticuloManufacturadoDetalleSchema = Schema({
  denominacionIngrediente: {
    type: String,
    required: [true, "La Denominacion Es Requerida"],
    
  },
  cantidad: {
    type: Number,
    required: [true, "La Cantidad Es Requerida"],
    
  },
  precioVenta :{
    type : Number,
    require : [true, "El Precio Venta Es Requerido"]
  }
});

module.exports = model(
  "articuloManufacturadoDetalle",
  ArticuloManufacturadoDetalleSchema
);
