
const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

const {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch } = require('../controllers/user-routes');


const router = Router();
const { validarCampos } = require('../middlewares/validarCampos');

router.get('/', usuarioGet);

router.put('/:id', usuarioPut);

//Middlewares "validator" haciendo validaciones antes de de llamar al controlador.
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('contrasenia', 'la contrasenia es requerida y debe tener al menos 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido "Roles permitidos: ADMIN_ROLE//USER_ROLE"').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo', 'Ingrese un correo valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPost);

router.delete('/', usuarioDelete);

router.patch('/', usuarioPatch);

module.exports = router;