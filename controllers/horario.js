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

    // Instanciamos la estructura del Admin
    const horario = new Horario({
        admin: uid,
        ...request.body
    });

    // Valores del body
    const { nombre } = request.body;

    try {
        // TODO: Encontrar el nombre en los horarios creados
        const existeHorario = await Horario.findOne({ nombre });

        if (existeHorario) {
            return response.status(400).json({
                ok: false,
                msg: 'Ya existe un horario con ese nombre'
            })
        }

        // TODO: Guardar en la base de datos
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
    // Obtenemos el id del enlace
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
const eliminarHorario = async (request, response) => {
    // Obtenemos el id del enlace
    const uid = request.params.id;

    try {
        // TODO: Buscamos horario por ID
        const horarioID = await Horario.findById(uid);

        // Si no se encuentra el id
        if (!horarioID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un horario por ese id'
            })
        }

        // TODO: Eliminación
        await Horario.findByIdAndDelete(uid);

        response.json({
            ok: true,
            msg: 'Horario eliminado'
        })
    } catch (error) {
        console.log(error);
        
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

module.exports = {
    getAllHorarios,
    getHorario,
    crearHorario,
    actualizarHorario,
    eliminarHorario
}