/*** 
 * Ruta: '/api/admin'
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controlador
const { 
    getAllAdmin, 
    crearAdmin, 
    actualizarAdmin, 
    eliminarAdmin
} = require('../controllers/admin');

const router = Router();

// TODO: Rutas
// Obtener admin
router.get('/', validarJWT, getAllAdmin);

// Crear admin
router.post('/', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], crearAdmin);

// Actualizar admin
router.put('/:id', [
    validarJWT,
    check('email', 'El correo electrónico es obligatorio').isEmail()
], actualizarAdmin);

// Eliminar admin
router.delete('/:id', validarJWT, eliminarAdmin)

module.exports = router;