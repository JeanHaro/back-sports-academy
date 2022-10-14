// Encriptación
const bcrypt = require('bcryptjs');

// Models
const Admin = require('../models/admin');

// Iniciar sesión
const login = async (request, response) => {
    const { email, password } = request.body;

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

        response.json({
            ok: true,
            msg: 'Conectado'
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
    login
}