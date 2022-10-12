const { validationResult } = require('express-validator');

// Verifica si no hay errores
const validarCampos = (request, response, next) => {
    const errores = validationResult(request);

    // Si los errores no están vacios
    if (!errores.isEmpty()) {
        return response.status(400).json({
            ok: false,
            errors: errores.mapped() // Se traen los errores mapeados
        })
    }

    next();
}

module.exports = {
    validarCampos
}