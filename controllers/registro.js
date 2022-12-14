// Date-fns
const { format } = require('date-fns');

// Models
const Horario = require('../models/horario');
const Registro = require('../models/registro');

// Variables de entorno
require('dotenv').config();

// Servicios
const { enviarMail } = require('../services/email');

// Obtener Registros
const getAllRegistros = async (request, response) => {
    const registros = await Registro.find().populate('admin', 'email');

    response.json({
        ok: true,
        msg: registros
    });
}

// Obtener Registro
const getRegistro = async (request, response) => {
    const uid = request.params.id;

    const registro = await Registro.findById(uid).populate('admin', 'email').populate('horario'); 

    response.json({
        ok: true,
        registro
    })
}

// Crear Registro
const crearRegistro = async (request, response) => {
    const uid = request.uid;

    // Instanciamos la estructura del Admin
    const registro = new Registro({
        admin: uid,
        ...request.body
    })

    // Valores del body
    const { nombre, apellido, codigo, celular, edad, email, dni, horario } = request.body;

    try {
        // TODO: Encontrar el email en los registros creados
        const existeEmail = await Registro.findOne({ email });

        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'Hay un usuario registrado con ese email'
            })
        }

        const existeDNI = await Registro.findOne({ dni });

        // Existe dni
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

        // Si la fecha inicial del horario ya pas??
        if (fecha_inicio < today) {
            return response.status(404).json({
                ok: false,
                msg: 'El horario ya ha comenzado',
            })
        }

        // TODO: Reducir una matr??cula al horario
        campo = {
            cant_matriculas: horarioID.cant_matriculas - 1
        }

        // TODO: Guardar en la base de datos
        const registroDB = await registro.save();

        // TODO: Actualizaci??n del horario
        await Horario.findByIdAndUpdate(horario, campo, { new: true });

        // TODO: Enviar al correo
        let contentHtml = `
            <h1>Forcrack Registro</h1>

            <p>??Felicidades! Ya est??s registrad@ como alumno de nuestra instituci??n deportiva</p>
            <br>
            <p>El costo de la matr??cula es: S/ 80</p>
            <p>El costo de los pagos mensuales es de: S/ 450</p>
            <p>Tu c??digo para el pago es: ${codigo}</p>

            <h2>Depositar a esta cuenta:</h2>

            <ul>
                <li>Nombre: Forcrack</li>
                <li>N?? de cuenta: 205-16486468-1-25</li>
                <li>CCI: 056454684646665</li>
            </ul>

            <h2>Informaci??n personal</h2>
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
                <li>Edad m??nima: ${horarioID.edad_min}</li>
                <li>Edad m??xima: ${horarioID.edad_max}</li>
                <li>Hora: ${horarioID.hora_inicial} - ${horarioID.hora_final}</li>
                <li>Fecha de inicio: ${fecha_inicio}</li>
                <li>Fecha final: ${fecha_final}</li>
            </ul>
        `;

        const datos = {
            from: process.env.CORREO,
            to: email,
            subject: 'Registro',
            html: contentHtml
        }

        enviarMail(response, datos);

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
const actualizarRegistro = async (request, response) => {
    // Obtenemos el id del enlace
    const uid = request.params.id;

    try {
        // TODO: Buscar registro por el ID 
        const registroID = await Registro.findById(uid);

        // Si no se encuentra el id
        if (!registroID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un registro por ese id'
            })
        }

        // TODO: Campos recibidos
        const { email, dni, horario, ...campos } = request.body;

        // TODO: Si el email del id no es igual al email recibida
        if (registroID.email !== email) {
            const existeEmail = await Registro.findOne({ email: request.body.email })

            // Si el email ya existe
            if (existeEmail) {
                return response.status(400).json({
                    ok: false,
                    msg: "Ya existe un registro con ese email"
                })
            }
        }

        // TODO: Si el DNI del id no es igual al dni recibida
        if (registroID.dni !== dni) {
            const existeDNI = await Registro.findOne({ dni: request.body.dni })

            // Si el email ya existe
            if (existeDNI) {
                return response.status(400).json({
                    ok: false,
                    msg: 'Hay un usuario registrado con ese dni'
                })
            }
        }

        // TODO: Buscar horario nuevo por el ID 
        const horario_nuevoID = await Horario.findById(horario); 

        // Si no se encuentra el id
        if (!horario_nuevoID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe el horario nuevo por ese id'
            })
        }

        // Si no hay vacantes en el nuevo horario
        if (horario_nuevoID.cant_matriculas <= 0) {
            return response.status(404).json({
                ok: false,
                msg: 'No hay vacantes para este horario'
            })
        }

        // TODO: Reducir una matr??cula al horario nuevo
        campo_despues = {
            cant_matriculas: horario_nuevoID.cant_matriculas - 1
        }

        // TODO: Actualizaci??n del horario nuevo
        await Horario.findByIdAndUpdate(horario, campo_despues, { new: true });

        // TODO: Obtener el ID del horario anterior
        const horario_anterior = registroID.horario;

        // TODO: Buscar horario anteropr por el ID 
        const horario_anteriorID = await Horario.findById(horario_anterior); 

        // Si no se encuentra el id
        if (!horario_anteriorID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe el horario anterior por ese id'
            })
        }

        // TODO: Aumentarle la matricula al horario anterior
        campo_anterior = {
            cant_matriculas: horario_anteriorID.cant_matriculas + 1
        }

        // TODO: Actualizaci??n del horario anterior
        await Horario.findByIdAndUpdate(horario_anterior, campo_anterior, { new: true });

        // TODO: Guardamos el email
        campos.email = email;

        // TODO: Actualizaci??n
        const registroActualizado = await Registro.findByIdAndUpdate(uid, campos, { new: true });
        
        response.json({
            ok: true,
            admin: registroActualizado
        })
    } catch (error) {
        console.log(error);
        
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

// Eliminar Registro
const eliminarRegistro = async (request, response) => {
    // Obtenemos el id del enlace
    const uid = request.params.id;

    try {
        // TODO: Buscamos registro por ID
        const registroID = await Registro.findById(uid);

        // Si no se encuentra el id
        if (!registroID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un registro por ese id'
            })
        }

        // TODO: Buscar horario por el ID 
        const horarioID = await Horario.findById(registroID.horario); 

        // Si no se encuentra el id
        if (!horarioID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe el horario por ese id'
            })
        }

        // TODO: Aumentar una matr??cula al horario
        campo = {
            cant_matriculas: horarioID.cant_matriculas + 1
        }

        // TODO: Actualizaci??n del horario
        await Horario.findByIdAndUpdate(registroID.horario, campo, { new: true });

        // TODO: Eliminaci??n
        await Registro.findByIdAndDelete(uid);

        response.json({
            ok: true,
            msg: 'Registro eliminado'
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
    getAllRegistros,
    getRegistro,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
}
