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

const crearAdmin = async (request, response) => {
    // Valores del body
    const { email, password } = request.body;

    // Instanciamos la estructura del Admin
    const admin = new Admin(request.body);

    // Guardar en la base de datos
    await admin.save();

    response.json({
        ok: true,
        admin
    })
}

module.exports = {
    getAdmin,
    crearAdmin
}