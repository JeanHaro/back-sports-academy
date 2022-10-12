/*** 
 * Ruta: '/api/admin'
***/

const { Router } = require('express');

// Controlador
const { getAdmin, crearAdmin } = require('../controllers/admin');

const router = Router();

// Rutas
// Obtener admin
router.get('/', getAdmin);
// Crear admin
router.post('/', crearAdmin)

module.exports = router;