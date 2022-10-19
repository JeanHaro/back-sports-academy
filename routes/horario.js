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
    crearHorario,
    actualizarHorario,
    eliminarHorario
} = require('../controllers/horario');

const router = Router();

// TODO: Rutas
// Obtener horarios
router.get('/', validarJWT,getAllHorarios);

// Crear horario
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('cant_matriculas', 'La cantidad de matriculas es obligatoria').not().isEmpty(),
    check('turno', 'El turno es obligatorio').not().isEmpty(),
    check('rango_edad', 'El rango de edad es obligatorio').not().isEmpty(),
    check('rango_hora', 'El rango de hora es obligatorio').not().isEmpty(),
    check('fecha_inicial', 'La fecha inicial es obligatorio').isDate(),
    check('fecha_final', 'La fecha final es obligatorio').isDate(),
    validarCampos
], crearHorario);

// Actualizar horario
router.put('/:id', [], actualizarHorario);

// Eliminar horario
router.delete('/:id', eliminarHorario);

module.exports = router;