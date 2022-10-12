/*** 
 * Ruta: '/api/admin'
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { getAdmin, crearAdmin } = require('../controllers/admin');

const router = Router();

// TODO: Rutas
// Obtener admin
router.get('/', getAdmin);
// Crear admin
router.post('/', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], crearAdmin)

module.exports = router;