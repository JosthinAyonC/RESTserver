const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');

const { validarJWT } = require('../middlewares/validaJWT');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo', 'Ingrese un correo valido').isEmail(),
    check('contrasenia', 'Contrasenia obligatoria').not().isEmpty(),
    validarCampos

], login);

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos

], googleSignIn);

module.exports = router; 