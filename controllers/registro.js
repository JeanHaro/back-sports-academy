// Obtener Registros
const getAllRegistros = (request, response) => {
    response.json({
        ok: true,
        msg: 'Obtener Registros'
    });
}

// Crear Registro
const crearRegistro = (request, response) => {
    response.json({
        ok: true,
        msg: 'Crear Registro'
    });
}

// Actualizar Registro
const actualizarRegistro = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Registro'
    });
}

// Eliminar Registro
const eliminarRegistro = (request, response) => {
    response.json({
        ok: true,
        msg: 'Eliminar Registro'
    });
}

module.exports = {
    getAllRegistros,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
}
