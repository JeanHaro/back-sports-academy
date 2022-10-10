// Obtenemos el express
const express = require('express');

// Variables de entorno
require('dotenv').config();

// CORS
const cors = require('cors');

// Conectar a la BD
const { dbConnection } = require('./database/config');

// Crea el servidor
const app = express();

// Configurar CORS
app.use(cors());

// Conectar a la BD
dbConnection();

// Rutas
app.get('/', (request, response) => {
    response.status(400).json({
        ok: true,
        msg: 'Hola mundo'
    })
})

// Levantamos el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});