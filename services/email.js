// Nodemailer
const nodeMailer = require('nodemailer');

// Variables de entorno
require('dotenv').config();

// TODO: Configuración para enviar email 
const enviarMail = (response, datos) => {
    let transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.CORREO,
            pass: process.env.CORREO_PASS
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    
    transport.verify().then(() => {
        console.log('Email enviado')
    }) 
    
    transport.sendMail(datos, (error, result) => {
    
        if (error) return response.json({ ok: false, msg: error })
    
        return response.json({
            ok: true,
            msg: result
        })
    })
}


module.exports = {
    enviarMail
}