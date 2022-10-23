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

// Obtener horario
const getHorario = async (request, response) => {
    const uid = request.params.id;

    const horario = await Horario.findById(uid);

    response.json({
        ok: true,
        horario
    })
}

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
const actualizarHorario = async (request, response) => {
    const uid = request.params.id;

    try {
        // TODO: Buscar horario por el ID 
        const horarioID = await Horario.findById(uid); 

        // TODO: Si no se encuentra el id
        if (!horarioID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un horario por ese id'
            })
        }

        // TODO: Campos recibidos
        const { nombre, ...campos } = request.body;

        // TODO: Si el nombre del id no es igual al nombre recibida
        if (horarioID.nombre !== nombre) {
            const existeHorario = await Horario.findOne({ nombre: request.body.nombre })
        
            if (existeHorario) {
                return response.status(400).json({
                    ok: false,
                    msg: "Ya existe un horario con ese nombre"
                })
            }
        }

        // TODO: Guardamos el nombre
        campos.nombre = nombre;

        // TODO: Actualización
        const horarioActualizado = await Horario.findByIdAndUpdate(uid, campos, { new: true });

        response.json({
            ok: true,
            msg: horarioActualizado
        })
    } catch (error) {
        console.log(error);
        
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
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
    getHorario,
    crearHorario,
    actualizarHorario,
    eliminarHorario
}