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
const actualizarRegistro = async (request, response) => {
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
        const { email, ...campos } = request.body;

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

        // TODO: Guardamos el email
        campos.email = email;

        // TODO: Actualización
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
        // TODO: Buscamos admin por ID
        const registroID = await Registro.findById(uid);

        // Si no se encuentra el id
        if (!registroID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un registro por ese id'
            })
        }

        // TODO: Eliminación
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
