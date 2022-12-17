// Date-fns
const { format } = require('date-fns');

// Models
const Matricula = require('../models/matricula');
const Horario = require('../models/horario');
const Registro = require('../models/registro');

// Variables de entorno
require('dotenv').config();

// Servicios
const { enviarMail } = require('../services/email');

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
    const { nombre, apellido, codigo, celular, edad, email, dni, horario } = request.body;

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

        // Fecha final
        let yearE = new Date(horarioID.fecha_final).getUTCFullYear();
        let monthE = new Date(horarioID.fecha_final).getUTCMonth();
        let dayE = new Date(horarioID.fecha_final).getUTCDate();
        // date-fns
        let fecha_final = format(new Date(yearE, monthE, dayE), 'yyyy-MM-dd');

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

        // TODO: Enviar al correo
        let contentHtml = `
            <h1>Forcrack Matricula</h1>

            <p>El costo de la matrícula es: S/ 80</p>
            <p>El costo de los pagos mensuales es de: S/ 450</p>
            <p>Tu código para el pago es: ${codigo}</p>

            <h2>Depositar a esta cuenta:</h2>

            <ul>
                <li>Nombre: Forcrack</li>
                <li>N° de cuenta: 205-16486468-1-25</li>
                <li>CCI: 056454684646665</li>
            </ul>

            <h2>Información personal</h2>
            <ul>
                <li>Nombres: ${nombre}</li>
                <li>Apellidos: ${apellido}</li>
                <li>Email: ${email}</li>
                <li>Edad: ${edad}</li>
                <li>Celular: ${celular}</li>
                <li>DNI: ${dni}</li>
            </ul>

            <h2>Horario matriculado</h2>
            <ul>
                <li>Nombre: ${horarioID.nombre}</li>
                <li>Turno: ${horarioID.turno}</li>
                <li>Edad mínima: ${horarioID.edad_min}</li>
                <li>Edad máxima: ${horarioID.edad_max}</li>
                <li>Hora: ${horarioID.hora_inicial} - ${horarioID.hora_final}</li>
                <li>Fecha de inicio: ${fecha_inicio}</li>
                <li>Fecha final: ${fecha_final}</li>
            </ul>
        `;

        const datos = {
            from: process.env.CORREO,
            to: email,
            subject: 'Matricula',
            html: contentHtml
        }

        enviarMail(response, datos);

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