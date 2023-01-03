// Encriptación
const bcrypt = require('bcryptjs');

// Generar el JSON Web Token
const { generarJWT } = require('../helpers/jwt');

// Models
const Admin = require('../models/admin');

// Variables de entorno
require('dotenv').config();

// Servicios
const { generarCodigo } = require('../services/codigo');
const { enviarMail } = require('../services/email');

// Variables
let cod;

// TODO: Iniciar sesión
const login = async (request, response) => {
    const { email, password, codigo } = request.body;

    try {
        // TODO: Verificar el email
        const adminDB = await Admin.findOne({ email });

        // Si no existe el email
        if (!adminDB) {
            return response.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // TODO: Verificar contraseña
        const validPassword = bcrypt.compareSync(password, adminDB.password);

        // Si no es la contraseña
        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        if (adminDB.code) {
            if (codigo !== cod) {
                return response.status(400).json({
                    ok: false,
                    msg: 'Código no valido'
                })
            }
        }

        // TODO: Generar el token - le damos el ID
        const token = await generarJWT(adminDB.id);

        response.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);

        response.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

// TODO: Renovar el token
const renewToken = async (request, response) => {
    // uid del usuario
    const uid = request.uid;

    // Generar JWT
    const token = await generarJWT(uid);

    response.json({
        ok: true,
        token,
        uid
    })
}

// TODO: Enviar código al email
const sendCode = async (request, response) => {
    const { email } = request.body;

    try {
        // TODO: Obtener el admin por el email
        const adminDB = await Admin.findOne({ email });

        // Si el codigo es true
        if (adminDB.code) {
            cod = generarCodigo(6);

            // TODO: Enviar al correo
            let contentHtml = `
                <h1>Codigo de Inicio de sesión</h1>
                <br>
                <h2 style="text-align: 'center'">${cod}</h2>
            `;

            const datos = {
                from: process.env.CORREO,
                to: email,
                subject: 'Codigo de Login',
                html: contentHtml
            }

            enviarMail(response, datos);
        }

        setTimeout(() => {
            cod = process.env.CODE_SEND;
        }, 60000);

        // clearTimeout(tiempo);

        response.json({
            ok: true,
            msg: 'Codigo enviado'
        })
    } catch (error) {
        console.log(error);

        response.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    login,
    renewToken,
    sendCode
}