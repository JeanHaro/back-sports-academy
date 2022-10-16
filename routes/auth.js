/*** 
 * Ruta: '/api/auth'
***/

const { Router } = require('express');
const { check } = require('express-validator');

// Controlador
const { login } = require('../controllers/auth');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// TODO: Ruta
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', ' El password es obligatorio').not().isEmpty(), 
    validarCampos
], login);

module.exports = router;