const { Router } = require('express');

// Controlador
const { envioContactanos } = require('../controllers/contactanos');

const router = Router();

router.post('/', envioContactanos);

module.exports = router;
