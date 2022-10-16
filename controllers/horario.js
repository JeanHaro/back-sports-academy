const getAllHorarios = (request, response) => {
    response.json({
        ok: true,
        msg: 'Obtener Horarios'
    })
};

const crearHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Crear Horario'
    })
};

const actualizarHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Actualizar Horario'
    })
};

const eliminarHorario = (request, response) => {
    response.json({
        ok: true,
        msg: 'Borrar Horario'
    })
};

module.exports = {
    getAllHorarios,
    crearHorario,
    actualizarHorario,
    eliminarHorario
}