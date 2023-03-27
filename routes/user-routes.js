
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,validarJWT, esAdminRole, tieneRol
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuario } = require('../helpers/db-validators');

const {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete } = require('../controllers/user-routes');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id', [

    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRoleValido),
    validarCampos

], usuarioPut);

//Middlewares "validator" haciendo validaciones antes de de llamar al controlador.
router.post('/', [

    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('contrasenia', 'la contrasenia es requerida y debe tener al menos 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido "Roles permitidos: ADMIN_ROLE//USER_ROLE"').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo', 'Ingrese un correo valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos

], usuarioPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRol('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    check('id', 'Id no valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], usuarioDelete);


module.exports = router;