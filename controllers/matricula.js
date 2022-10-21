// Models
const Matricula = require('../models/matricula');

// Obtener Matriculas
const getAllMatriculas = async (request, response) => {
    const matriculas = await Matricula.find().populate('admin', 'email').populate('horario');
    
    response.json({
        ok: true,
        matriculas
    });
}

// Crear Matriculas
const crearMatricula = async (request, response) => {
    const uid = request.uid;
    const matricula = new Matricula({
        admin: uid,
        ...request.body
    })

    const { email } = request.body;

    try {
        const existeEmail = await Matricula.findOne({ email });

        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese email'
            })
        }

        const matriculaDB = await matricula.save();

        response.json({
            ok: true,
            msg: matriculaDB
        });
    } catch (error) {
        console.log(error);
        
        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

// Actualizar Matricula
const actualizarMatricula = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Matricula'
    });
}

// Eliminar Matricula
const eliminarMatricula = (request, response) => {
    response.json({
        ok: true,
        msg: 'Eliminar Matricula'
    });
}

module.exports = {
    getAllMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
}