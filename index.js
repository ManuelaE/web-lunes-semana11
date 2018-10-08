const express = require('express');
const hbs = require('express-handlebars');

const app = express();

// para definir ña carpeta pública
app.use(express.static('public'));

// para registrar el motor de render handlebars
app.engine('handlebars', hbs());

// para setear el motor de render a utilizar
app.set('view engine', 'handlebars');

//////// aqui hago el funcionamiento del codigo ////////

// importar modulo boy-parser
var bodyParser = require('body-parser');
// configurar modulo body-parser
app.use( bodyParser.json() );      // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));
// usar body-parser
app.use( express.json() );

// importar archivo personas
var personas = require('./personas');
    //console.log('personas: ', personas);

// definir ruta toot o principal
app.get('/', function(request, response){
    //response.send('test');
    // nombre del archivo handlebars
    var contexto = {
        texto: 'Mi texto de prueba', 
        //lo de la izquierda es el nombre de la variable - lo de la derecha es el valor
        lista: personas,
    };

    response.render('home', contexto);
});

// definir ruta para agregar
app.post('/agregar', function(request, response){

    //push es la funcion de los arreglos para agregar nuevos elementos
    //uso query solo cuando es get (nombre=hola)
    //params cuando despues de agregar hay dos puntos, se define en la ruta
    //body cuando utilizo post
    personas.push({
        //cerrar node con control + c
        //para usar boy tengo que instalar el modulo: npm install body-parser
        nombre: request.body.nombre,
        edad: request.body.edad,
    });
    console.log(request.body);

    //esto no representa una página entonces uso send en vez de render
    response.send('ok, agregado');

});

// iniciar el servidor en el puerto especificado
app.listen(5500);