/*** 
 * Ruta: '/api/admin'
***/

const { Router } = require('express');

// Controlador
const { getAdmin } = require('../controllers/admin');

const router = Router();

// Rutas
// Obtener admin
router.get('/', getAdmin);

module.exports = router;