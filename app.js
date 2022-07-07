/*
ENUNCIADO DEL EJERCICIO DE NODE

Debemos crear nuestra aplicación express dentro de un fichero principal llamado app.js, 
ahí definiremos endpoint principal que se cumpla siempre, otro igual al final.
La idea del ejercicio es definir dos flujos, por un lado tendremos un direccionamiento 
que servirá el estático de nuestro Quiz (/Quiz), por otro tendremos un direccionamiento a /home
para este último gestionado por un enrutador que hará lo siguiente:

- /home/contacto : console.log('Estamos en la página de contacto');
- /home/info : console.log('Estamos en la página de info');
- /home/error : Debe provocar un error para llevarnos hasta el middleware de error

Nuestro app.js tiene que estar definido de tal manera que:

- Siempre debemos pasar por el endpoint de apertura
- Solo lanzaremos el endpoint de cierre en caso de pasar por /home/contacto o en caso de error.

Todo esto debe estar gestionado por un servidor que levantaremos a través de Express que debe 
estar configurado para dos entornos, esto debe estar gestionado a través de variables de entorno (DOTENV)
 */

const express = require('express');
const app = express();
const router = express.Router();
const config = require('./modules/config');
const hostname = config.HOST;
const port = config.PORT;

app.use('/', (req, res, next) => {
    console.log('Endpoint de apertura');
    next();
});

app.use(express.static(__dirname + '/public'));

app.use('/quiz', (req, res) => {
    res.redirect('/ProyectoFront-master/index.html');
    res.status(200).end();
});

app.use('/home', (req, res, next) => {
    console.log('Has entrado en home');
    res.status(200).end();
    next();
});

app.use('/home', router);

router.get('/contacto', (req, res, next) => {
    console.log('Estamos en la página de contacto');
    res.status(200).end();
    next();
});

router.get('/info', (req, res, next) => {
    console.log('Estamos en la página de info');
    res.status(200).end();
});

router.get('/error', (req, res, next) => {
    const err = 'Error del sistema';
    next(err);
});

app.use((err, req, res, next) => {
    console.log(`Error: ${err}`);
});

app.use('/', (req, res) => {
    console.log('Endpoint de cierre');
    res.status(200).end();
});

app.listen(port, hostname, () => {
    console.log(`Servidor levantado con éxito en http://${hostname}:${port}`);
    
    // console.log(`Entorno: ${process.env.NODE_ENV}`);
});
