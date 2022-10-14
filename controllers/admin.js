// bycripts
const bcrypt = require('bcryptjs');

// Models
const Admin = require('../models/admin');

// Obtener administradores
const getAdmin = async (request, response) => {
    // TODO: Encontrar administradores
    const admin = await Admin.find();

    response.json({
        ok: true,
        admin
    })
}

// Crear administradores
const crearAdmin = async (request, response) => {
    // Valores del body
    const { email, password } = request.body;

    // Verificar si el admin ya existe
    try {
        // TODO: Encontrar los email de los admin
        const existeEmail = await Admin.findOne({ email });

        // Si el email ya existe
        if (existeEmail) {
            return response.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        // Instanciamos la estructura del Admin
        const admin = new Admin(request.body);

        // TODO: Encriptar contraseña
        // Genera un número o data de manera aleatoria
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt); // Hashea el password

        // TODO: Guardar en la base de datos
        await admin.save();

        response.json({
            ok: true,
            admin
        })
    } catch (error) {
        console.log(error);
        // 500 - error interno
        response.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar registros'
        })
    }
}

// Actualizar administrador
const actualizarAdmin = async (request, response) => {
    // Obtenemos el id del enlace
    const uid = request.params.id;
    
    try {
        // TODO: Buscar por el ID 
        const adminID = await Admin.findById(uid);

        // Si no se encuentra el id
        if (!adminID) {
            return response.status(404).json({
                ok: false,
                msg: 'No existe un admin por ese id'
            })
        }

        // TODO: Campos recibidos
        const campos = request.body;

        // TODO: Si el email del id es igual al email recibida
        if (adminID.email === request.body.email) {
            delete campos.email;
        } else {
            const existeEmail = await Admin.findOne({ email: request.body.email })

            // Si el email ya existe
            if (existeEmail) {
                return response.status(400).json({
                    ok: false,
                    msg: "Ya existe un administrador con ese email"
                })
            }
        }

        // TODO: Borramos el password del campo, para que no actualice
        delete campos.password;

        // TODO: Actualización
        const adminActualizado = await Admin.findByIdAndUpdate(uid, campos, { new: true });

        response.json({
            ok: true,
            admin: adminActualizado
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
    getAdmin,
    crearAdmin,
    actualizarAdmin
}