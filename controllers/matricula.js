// Obtener Matriculas
const getAllMatriculas = (request, response) => {
    response.json({
        ok: true,
        msg: 'Obtener Matriculas'
    });
}

// Crear Matriculas
const crearMatricula = (request, response) => {
    response.json({
        ok: true,
        msg: 'Crear Matricula'
    });
}

// Actualizar Matricula
const actualizarMatricula = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Matricula'
    });
}

// Eliminar Matricula
const eliminarMatricula = (request, response) => {
    response.json({
        ok: true,
        msg: 'Eliminar Matricula'
    });
}

module.exports = {
    getAllMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula
}