// Models
const Matricula = require('../models/matricula');
const Horario = require('../models/horario');

// Obtener Matriculas
const getAllMatriculas = async (request, response) => {
    const matriculas = await Matricula.find();
    
    response.json({
        ok: true,
        matriculas
    });
}

// Obtener Matricula
const getMatricula = async (request, response) => {
    const uid = request.params.id;

    const matricula = await Matricula.findById(uid).populate('horario');

    response.json({
        ok: true,
        matricula
    })
}

// Crear Matriculas
const crearMatricula = async (request, response) => {
    // Instanciamos la estructura del Admin
    const matricula = new Matricula({
        ...request.body
    })

    // Valores del body
    const { email, dni, horario } = request.body;

    try {
        // TODO: Encontrar el email en las matriculas creadas
        const existeEmail = await Matricula.findOne({ email });

        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese email'
            })
        }

        // TODO: Encontrar el dni en las matriculas creadas
        const existeDNI = await Matricula.findOne({ dni });

        if (existeDNI) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese dni'
            })
        }

        // TODO: Buscar horario por el ID 
        const horarioID = await Horario.findById(horario); 

        // Si no se encuentra el id
        if (!horarioID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe el horario por ese id'
            })
        }

        // Si no hay vacantes
        if (horarioID.cant_matriculas <= 0) {
            return response.status(404).json({
                ok: false,
                msg: 'No hay vacantes para este horario'
            })
        }

        // Si la fecha inicial del horario ya pasó
        if (horarioID.fecha_inicial <= new Date()) {
            return response.status(404).json({
                ok: false,
                msg: 'El horario ya ha comenzado'
            })
        }

        // TODO: Reducir una matrícula al horario
        campo = {
            cant_matriculas: horarioID.cant_matriculas - 1
        }

        // TODO: Actualización del horario
        await Horario.findByIdAndUpdate(horario, campo, { new: true });

        // TODO: Guardar en la base de datos la matricula
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

// Eliminar Matricula
const eliminarMatricula = async (request, response) => {
    // Obtenemos el id del enlace
    const uid = request.params.id;

    try {
        // TODO: Buscamos admin por ID
        const matriculaID = await Matricula.findById(uid);

        if (!matriculaID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe una matrícula por ese id'
            })
        }

        // TODO: Eliminación
        await Matricula.findByIdAndDelete(uid);

        // TODO: Buscar horario por el ID 
        const horarioID = await Horario.findById(matriculaID.horario); 

        // Si no se encuentra el id
        if (!horarioID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe el horario por ese id'
            })
        }

        // TODO: Aumentar una matrícula al horario
        campo = {
            cant_matriculas: horarioID.cant_matriculas + 1
        }

        // TODO: Actualización del horario
        await Horario.findByIdAndUpdate(matriculaID.horario, campo, { new: true });

        response.json({
            ok: true,
            msg: 'Matrícula eliminada'
        })
    } catch (error) {
        console.log(error);
        
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getAllMatriculas,
    getMatricula,
    crearMatricula,
    eliminarMatricula
}