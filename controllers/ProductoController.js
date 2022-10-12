var mongoose = require('mongoose');
var Producto = require("../models/Producto");
 
var productoController = {};
 
productoController.list = function(req, res){
    
    Producto.find({}).exec(function(err, productos){
        if( err ){ console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/producto/index', {productos: productos,titulo:'INDEX'} );
        
    });
    
};

productoController.show = function(req, res){
    Producto.findOne({_id: req.params.id}).exec(function(err, productos){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/producto/show', {productos: productos} );
    });
    
};

productoController.create = function(req, res){
    res.render('../views/producto/create');
};

productoController.save = function(req, res){
    var productos = new Producto( req.body );
    console.log(productos)

    productos.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a producto. :)");
        res.redirect("/productos/show/"+productos._id);
    });
};

productoController.edit = function(req, res) {
    Producto.findOne({_id: req.params.id}).exec(function (err, productos) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../views/producto/edit", {productos: productos});
      
    });
  };
   
  productoController.update = function(req, res){
    Producto.findByIdAndUpdate( req.params.id, {$set: {
          nombre: req.body.nombre,
          marca: req.body.marca,
          stock: req.body.stock,
          precio_compra: req.body.precio_compra,
          precio_venta: req.body.precio_venta

      }}, { new: true },
      function( err, productos){
          if( err ){ 
              console.log('Error: ', err); 
              res.render('../views/producto/edit', {productos: req.body} );
          }
          
          console.log( productos );
          
          res.redirect('/productos/show/' + productos._id);
          
      });
  };
   
  productoController.delete = function(req, res){
      
      Producto.remove({_id: req.params.id}, function(err){
          if( err ){ console.log('Error: ', err); return; }
          
          console.log("Producto deleted!");
          res.redirect("/productos");
      });
      
  };
module.exports = productoController;