// Servicios
const { enviarMail } = require('../services/email');

// Variables de entorno
require('dotenv').config();

// TODO: Enviar correo mediante contáctanos
const envioContactanos = (request, response) => {
    let { nombre, email, celular, asunto, mensaje } = request.body;

    let contentHtml = `
        <h1>Forcrack Contactos</h1>

        <ul>
            <li>Nombre: ${nombre}</li>
            <li>Asunto: ${asunto}</li>
            <li>Email: ${email}</li>
            <li>Celular: ${celular}</li>
        </ul>

        <p>Mensaje: ${mensaje}</p>
    `;

    const datos = {
        from: email,
        to: process.env.CORREO,
        subject: asunto,
        html: contentHtml
    }

    enviarMail(response, datos);
}

module.exports = {
    envioContactanos
}