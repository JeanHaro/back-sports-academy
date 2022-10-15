// JSON Web Token
const jwt = require('jsonwebtoken');

// TODO: Generar el JWT
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid
        }

        // TODO: Crear el JWT
        jwt.sign(payload, process.env.JWT_SECRET, {
            // Tiempo de expiración
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error);

                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}
