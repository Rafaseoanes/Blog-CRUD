let express = require("express");
let app = express();
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
var ejs = require("ejs");


//configuracion del body:
app.use(bodyParser.urlencoded({ extended: true }));


var path = __dirname + "/src/views";
app.set("views", path); // donde estan los archivos que se van a mostrar en el navegador (views)
app.set("view engine", "ejs"); //configuro el motor de plantilla o motor de vista a ulizar (EJS)


//conexion DB:
mongoose.connect("mongodb+srv://WilyerArias77:DBadmin2022@cluster0.u3qlx.mongodb.net/DBCuartaEntrega?retryWrites=true&w=majority"
)
  .then(function (db) {
    console.log("Conectado con la base de datos");
  })
  .catch(function (err) {
    console.log(err);
  });


var Tarjeta = require("./src/models/tarjetas");


//Ruta de incio y MUESTRA de los articulos
app.get("/inicio", async function (req, res) {

  var documentos = await Tarjeta.find();
  console.log(documentos);
  res.render("index" , {tarjetas: documentos});

});

//Ruta para acceder al FORMULARIO:
app.get("/crear", function (req, res) {
  //res.sendFile(__filename + "index.html");
  res.render("formulario");

});


//Ruta para CREAR un nuevo articulo:
app.post("/crear", async function (req, res) {
  var articulos = req.body;

  var nuevo_articulo = new Tarjeta(articulos); //opcional 
  await nuevo_articulo.save();
  console.log("Elemento Ingresado");
  res.redirect("/inicio");
});


//Ruta para "Vermas" detalles del articulo:
app.get("/mostrar/:id_tarjetas" , async function(req, res){
  var id = req.params.id_tarjetas;
  
  var tarjeta = await Tarjeta.findById(id);
  res.render("formularios_completos",{
    documento: tarjeta,
  });
    //doc: tarjeta, //le estoy mandando el documento que encontre el la DB, "doc" es como lo voy a recibir en el archivo editar y "tarea" es la variable que estoy creando para buscar en la DB.
});


//Ruta para "Editar el documento":
app.get("/modificar/:id_tarjetas", async function(req, res){
  var id= req.params.id_tarjetas;
  var tarjeta = await Tarjeta.findById(id);
  res.render("editar",{
      doc: tarjeta,
  });

});
app.post("/modificar/:id_tarjetas", async function(req, res){
  var id = req.params.id_tarjetas;

  var tarjeta = await Tarjeta.updateOne({_id: id}, req.body);
  res.redirect("/inicio");

});

//Ruta para Eliminar el articulo:
app.get("/modificar/eliminar/:id_tarjetas", async function(req, res){
  var id= req.params.id_tarjetas;
  var tarjeta = await Tarjeta.findById(id);
  await tarjeta.remove();
  res.redirect("/inicio");
});



app.listen(5400);
