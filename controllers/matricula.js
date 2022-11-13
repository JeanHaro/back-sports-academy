// Date-fns
const { format } = require('date-fns');

// Models
const Matricula = require('../models/matricula');
const Horario = require('../models/horario');
const Registro = require('../models/registro');

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

        // TODO: Encontrar el email en los registros creados
        const emailRegistro = await Registro.findOne({ email });

        // Existe email
        if (existeEmail || emailRegistro) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese email'
            })
        }

        // TODO: Encontrar el dni en las matriculas creadas
        const existeDNI = await Matricula.findOne({ dni });

        const dniRegistro = await Registro.findOne({ dni });

        // Existe dni
        if (existeDNI || dniRegistro) {
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

        // TODO: Fechas horario
        // Fecha inicio
        let yearS = new Date(horarioID.fecha_inicial).getUTCFullYear();
        let monthS = new Date(horarioID.fecha_inicial).getUTCMonth();
        let dayS = new Date(horarioID.fecha_inicial).getUTCDate();
        // date-fns
        let fecha_inicio = format(new Date(yearS, monthS, dayS), 'yyyy-MM-dd');

         // Fecha hoy
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let day = new Date().getDate();
        // date-fns
        let today = format(new Date(year, month, day), 'yyyy-MM-dd');

        // Si la fecha inicial del horario ya pasó
        if (fecha_inicio < today) {
            return response.status(404).json({
                ok: false,
                msg: 'El horario ya ha comenzado',
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

        // TODO: Eliminación
        await Matricula.findByIdAndDelete(uid);

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