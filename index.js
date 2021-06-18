//creamos el servidor de express
import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
const app = express();
import colors from 'colors'

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

//conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

// CONSTANTES DE CONFIGURACION
app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || '0.0.0.0');
app.set('appName',"SISTEMA DE VIAJES CON NODE");

//habilitar pug
app.set('view engine', 'pug')

// obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); //locals permite crear variables que pueden ser accedidas en las vistas
    res.locals.nombreSitio = 'Agencia de Viajes'
    next();
});

//agregar body parser para leer datos de formularios
app.use(express.urlencoded({extended:true}));

//  definir la carpeta pucblica 
// permite leer en todo el proyecto lo que esta en la carpeta publica: por ejemplo imagenes
app.use(express.static('public'));

// agraga el router
app.use('/',router);

//definir puerto
app.listen(app.get('port'), app.get('host'), () => {
    console.log(app.get('appName').bgYellow.black);
    console.log(`Server on port ${app.get('port')} :D`.blue.bold);
});