/*** 
 * Ruta: '/api/horarios'
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Controllers
const { 
    getAllHorarios,
    getHorario,
    crearHorario,
    actualizarHorario,
    eliminarHorario
} = require('../controllers/horario');

const router = Router();

// TODO: Rutas
// Obtener horarios
router.get('/', validarJWT, getAllHorarios);

// Obtener horario
router.get('/:id', validarJWT, getHorario);

// Crear horario
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('cant_matriculas', 'La cantidad de matriculas es obligatoria').not().isEmpty(),
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('edad_min', 'La edad mínima es obligatoria').not().isEmpty(),
    check('edad_max', 'La edad máxima es obligatorio').not().isEmpty(),
    check('hora_inicial', 'La hora inicial es obligatoria').not().isEmpty(),
    check('hora_final', 'La hora final es obligatoria').not().isEmpty(),
    check('fecha_inicial', 'La fecha inicial es obligatorio').isDate(),
    check('fecha_final', 'La fecha final es obligatorio').isDate(),
    validarCampos
], crearHorario);

// Actualizar horario
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('cant_matriculas', 'La cantidad de matriculas es obligatoria').not().isEmpty(),
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('rango_edad', 'El rango de edad es obligatorio').not().isEmpty(),
    check('rango_hora', 'El rango de hora es obligatorio').not().isEmpty(),
    check('fecha_inicial', 'La fecha inicial es obligatorio').isDate(),
    check('fecha_final', 'La fecha final es obligatorio').isDate(),
    validarCampos
], actualizarHorario);

// Eliminar horario
router.delete('/:id', validarJWT, eliminarHorario);

module.exports = router;