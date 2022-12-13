const { Router } = require('express');

// Controlador
const { envioContactanos } = require('../controllers/email');

const router = Router();

router.post('/', envioContactanos);

module.exports = router;
