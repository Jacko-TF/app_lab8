var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ProductoSchema = new Schema({
    nombre: {type: String, required: true, max: 20},
    marca: {type: String, required: true, max: 20},
    stock: {type: Number, required: true},
    precio_compra: {type: Number, required: true},
    precio_venta: {type: Number, required: true},
    created_at: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('Producto', ProductoSchema);
