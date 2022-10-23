/*** 
 *  Ruta: /api/matricula
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { 
    getAllMatriculas,
    getMatricula,
    crearMatricula,
    eliminarMatricula
} = require('../controllers/matricula');

const router = Router();

// TODO: Rutas
// Obtener matriculas
router.get('/', validarJWT, getAllMatriculas);

// Obtener matricula
router.get('/:id', validarJWT, getMatricula)

// Crear matricula
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
], crearMatricula);

// Eliminar matricula
router.delete('/:id', validarJWT, eliminarMatricula);

module.exports = router;