/*** 
 * Ruta: '/api/auth'
***/

const { Router } = require('express');
const { check } = require('express-validator');

// Controlador
const { login, renewToken } = require('../controllers/auth');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// TODO: Ruta
// Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', ' El password es obligatorio').not().isEmpty(), 
    validarCampos
], login);

// Renovar token
router.get('/renew', validarJWT, renewToken);

module.exports = router;