var mongoose = require('mongoose');
var Empleado = require("../models/Empleado");
 
var empleadoController = {};
 
empleadoController.list = function(req, res){
    
    Empleado.find({}).exec(function(err, empleados){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/empleado/index', {empleados: empleados,titulo:'INDEX'} );
        
    });
    
};

empleadoController.show = function(req, res){
    Empleado.findOne({_id: req.params.id}).exec(function(err, empleados){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/empleado/show', {empleados: empleados} );
    });
    
};

empleadoController.create = function(req, res){
    res.render('../views/empleado/create');
};

empleadoController.save = function(req, res){
    var empleados = new Empleado( req.body );
    console.log(empleados)

    empleados.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a empleado. :)");
        res.redirect("/empleados/show/"+empleados._id);
    });
};

empleadoController.edit = function(req, res) {
    Empleado.findOne({_id: req.params.id}).exec(function (err, empleados) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../views/empleado/edit", {empleados: empleados});
      
    });
  };
   
  empleadoController.update = function(req, res){
    Empleado.findByIdAndUpdate( req.params.id, {$set: {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          edad: req.body.edad,
          direccion: req.body.direccion,
          area: req.body.area,
          sueldo: req.body.sueldo

      }}, { new: true },
      function( err, empleados){
          if( err ){ 
              console.log('Error: ', err); 
              res.render('../views/empleado/edit', {empleados: req.body} );
          }
          
          console.log( empleados );
          
          res.redirect('/empleados/show/' + empleados._id);
          
      });
  };
   
  empleadoController.delete = function(req, res){
      
    Empleado.remove({_id: req.params.id}, function(err){
          if( err ){ console.log('Error: ', err); return; }
          
          console.log("Empleado deleted!");
          res.redirect("/empleados");
      });
      
  };
module.exports = empleadoController;