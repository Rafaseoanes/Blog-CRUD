var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mod_tarjetas = new Schema({
  titulo: String,
  url: String,
  texto: String,
  autor:String,
  fecha: Date, 
  categoria: String,
  etiqueta: String
});

module.exports = mongoose.model("Tareas", mod_tarjetas);