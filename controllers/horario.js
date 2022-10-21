// Modelo
const Horario = require('../models/horario');

// Obtener horarios
const getAllHorarios = async (request, response) => {
    const horario = await Horario.find();

    response.json({
        ok: true,
        horario
    })
};

// Crear horario
const crearHorario = async (request, response) => {
    const uid = request.uid;
    const horario = new Horario({
        admin: uid,
        ...request.body
    });

    const { nombre } = request.body;

    try {
        const existeHorario = await Horario.findOne({ nombre });

        if (existeHorario) {
            return response.status(400).json({
                ok: false,
                msg: 'Ya existe un horario con ese nombre'
            })
        }

        const horarioDB = await horario.save();

        response.json({
            ok: true,
            horario: horarioDB
        })
    } catch (error) {
        console.log(error);

        response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
};

// Actualizar Horario
const actualizarHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Horario'
    })
};

// Eliminar Horario
const eliminarHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Borrar Horario'
    })
};

module.exports = {
    getAllHorarios,
    crearHorario,
    actualizarHorario,
    eliminarHorario
}