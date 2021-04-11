const {Schema, model} = require('mongoose');

const ArticuloManufacturadoDetalleSchema = Schema({
cantidad:{
    type:Number,
    required:[true,'La Cantidad Es Requerida'],
    default: 1
    
},
unidadMedida:{
    type:String,
    required:[true,'La Unidad De Medida Es Requerida'],
    default : "Kg"
    
}

})

module.exports = model('articuloManufacturadoDetalle', ArticuloManufacturadoDetalleSchema);