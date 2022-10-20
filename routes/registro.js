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
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro 
} = require('../controllers/registro');


const router = Router();

// TODO: Rutas
// Obtener registros
router.get('/', getAllRegistros);

// Crear registro
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('celular', 'El celular es obligatorio').not().isEmpty(),
    check('dni', 'El número del DNI es obligatorio').not().isEmpty(),
    check('horario', 'El id del horario es obligatorio').not().isEmpty(),
    validarCampos
], crearRegistro);

// Actualizar registro
router.put('/:id', [], actualizarRegistro);

// Eliminar registro
router.delete('/:id', eliminarRegistro);

module.exports = router;

