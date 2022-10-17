/*** 
 *  Ruta: /api/registro
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');

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
router.post('/', [], crearRegistro);

// Actualizar registro
router.put('/:id', [], actualizarRegistro);

// Eliminar registro
router.delete('/:id', eliminarRegistro);

module.exports = router;

