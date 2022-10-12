var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var EmpleadoSchema = new Schema({
    nombre: {type: String, required: true, max: 20},
    apellido: {type: String, required: true, max: 20},
    edad: {type: Number, required: true},
    direccion: {type: String, required: true, max: 20},
    area: {type: String, required: true},
    sueldo: {type: Number, required: true},
    created_at: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('Empleado', EmpleadoSchema);
