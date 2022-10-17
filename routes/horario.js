/*** 
 * Ruta: '/api/horarios'
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

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
router.get('/', getAllHorarios);

// Crear horario
router.post('/', [], crearHorario);

// Actualizar horario
router.put('/:id', [], actualizarHorario);

// Eliminar horario
router.delete('/:id', eliminarHorario);

module.exports = router;