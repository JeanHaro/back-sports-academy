const mongoose = require('mongoose');

// Variables de entorno
require('dotenv').config();

// TODO: Establecer la conexión
const dbConnection = async () => {
    try {
        // Para conectarnos al BD
        await  mongoose.connect(process.env.DB_CONNECT);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD, ver logs');
    }
}

module.exports = {
    dbConnection
}
