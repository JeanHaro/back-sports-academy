/*** 
 * Ruta: '/api/admin'
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Controlador
const { getAdmin, crearAdmin } = require('../controllers/admin');

const router = Router();

// Rutas
// Obtener admin
router.get('/', getAdmin);
// Crear admin
router.post('/', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
], crearAdmin)

module.exports = router;