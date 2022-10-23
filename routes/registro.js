/*** 
 *  Ruta: /api/registro
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { 
    getAllRegistros,
    getRegistro,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
} = require('../controllers/registro');


const router = Router();

// TODO: Rutas
// Obtener registros
router.get('/', validarJWT, getAllRegistros);

// Obtener registro
router.get('/:id', validarJWT, getRegistro);

// Crear registro
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('celular', 'El celular es obligatorio').not().isEmpty(),
    check('dni', 'El número del DNI es obligatorio').not().isEmpty(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('horario', 'El id del horario es obligatorio').isMongoId(),
    validarCampos
], crearRegistro);

// Actualizar registro
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('celular', 'El celular es obligatorio').not().isEmpty(),
    check('dni', 'El número del DNI es obligatorio').not().isEmpty(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('horario', 'El id del horario es obligatorio').isMongoId(),
    validarCampos
], actualizarRegistro);

// Eliminar registro
router.delete('/:id', validarJWT, eliminarRegistro);

module.exports = router;

