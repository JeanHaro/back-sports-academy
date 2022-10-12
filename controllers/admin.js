// Obtener administradores
const getAdmin = (request, response) => {
    response.status(400).json({
        ok: true,
        admins: []
    })
}

module.exports = {
    getAdmin
}