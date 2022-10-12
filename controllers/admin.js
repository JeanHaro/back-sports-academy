// Models
const Admin = require('../models/admin');

// Obtener administradores
const getAdmin = async (request, response) => {
    // Encontrar administradores
    const admin = await Admin.find();

    response.json({
        ok: true,
        admin
    })
}

// Crear administradores
const crearAdmin = async (request, response) => {
    // Valores del body
    const { email, password } = request.body;

    // Verificar si el admin ya existe
    try {
        // Encontrar los email de los admin
        const existeEmail = await Admin.findOne({ email });

        // Si el email ya existe
        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        // Instanciamos la estructura del Admin
        const admin = new Admin(request.body);

        // Guardar en la base de datos
        await admin.save();

        response.json({
            ok: true,
            admin
        })
    } catch (error) {
        console.log(error);
        // 500 - error interno
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar registros'
        })
    }
}

module.exports = {
    getAdmin,
    crearAdmin
}