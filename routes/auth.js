const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');

const { validarJWT } = require('../middlewares/validaJWT');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo', 'Ingrese un correo valido').isEmail(),
    check('contrasenia', 'Contrasenia obligatoria').not().isEmpty(),
    validarCampos

], login);

module.exports = router; 