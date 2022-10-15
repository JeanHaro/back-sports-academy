// JWT
const jwt = require('jsonwebtoken');

// TODO: Validar el JSON Web Token
const validarJWT = (request, response, next) => {
    // Obtenemos el token desde el header
    const token = request.header('x-token');

    // console.log(token);

    // TODO: Si no hay token
    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        // TODO: Verificamos si el id es el JWT
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        
        request.uid = uid;

        // console.log(uid);
    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}