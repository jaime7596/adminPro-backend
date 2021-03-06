require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config')
var bodyParser = require('body-parser');// instalar: npm install body-parser

// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true })); //body formulario
// app.use(bodyParser.json()); // body en formato json

// Base de Datos
dbConnection();

// Directorio Publico
app.use(express.static('public'));

const usuariosRoutes = require('./routes/usuarios')

//Rutas 
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + 3000);
})


// d8hGkP9tXfi5I0TB
// mean_user

