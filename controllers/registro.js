// Models
const Registro = require('../models/registro');

// Obtener Registros
const getAllRegistros = async (request, response) => {
    const registros = await Registro.find().populate('admin', 'email').populate('horario');

    response.json({
        ok: true,
        msg: registros
    });
}

// Crear Registro
const crearRegistro = async (request, response) => {
    const uid = request.uid;
    const registro = new Registro({
        admin: uid,
        ...request.body
    })

    const { email } = response.status;

    try {
        const existeEmail = await Registro.findOne({ email });

        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese email'
            })
        }

        const registroDB = await registro.save();

        response.json({
            ok: true,
            msg: registroDB
        });
    } catch (error) {
        console.log(error);

        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

// Actualizar Registro
const actualizarRegistro = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Registro'
    });
}

// Eliminar Registro
const eliminarRegistro = (request, response) => {
    response.json({
        ok: true,
        msg: 'Eliminar Registro'
    });
}

module.exports = {
    getAllRegistros,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
}
