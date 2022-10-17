/*** 
 *  Ruta: /api/matricula
***/

const { Router } = require('express');

// Validación de campos
const { check } = require('express-validator');

// Controllers
const { 
    getAllMatriculas,
    crearMatricula,
    actualizarMatricula,
    eliminarMatricula 
} = require('../controllers/matricula');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// TODO: Rutas
// Obtener matriculas
router.get('/', getAllMatriculas);

// Crear matricula
router.post('/', [], crearMatricula);

// Actualizar matricula
router.put('/:id', [], actualizarMatricula);

// Eliminar matricula
router.delete('/:id', eliminarMatricula);

module.exports = router;