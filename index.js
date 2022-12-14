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

// Parseo del body
app.use(express.json());

// Conectar a la BD
dbConnection();

// Rutas
// --> Admin
app.use('/api/admin', require('./routes/admin'));
// --> Horario
app.use('/api/horario', require('./routes/horario'));
// --> Matricula
app.use('/api/matricula', require('./routes/matricula'));
// --> Registro
app.use('/api/registro', require('./routes/registro'));
// --> Auth
app.use('/api/auth', require('./routes/auth'));
// --> Enviar Correo
app.use('/api/contacto', require('./routes/contactanos'));

// Levantamos el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});