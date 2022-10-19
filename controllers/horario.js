// Modelo
const Horario = require('../models/horario');

// Obtener horarios
const getAllHorarios = (request, response) => {
    response.json({
        ok: true,
        msg: 'Obtener Horarios'
    })
};

const crearHorario = async (request, response) => {
    const uid = request.uid;
    const horario = new Horario({
        registro: uid,
        ...request.body
    });

    try {
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

const actualizarHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Horario'
    })
};

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