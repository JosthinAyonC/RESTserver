const validarJWT = require('../middlewares/validaJWT');
const validarCampo = require('../middlewares/validarCampos');
const validaRoles = require('../middlewares/validarRoles');


module.exports = {
    ...validaRoles,
    ...validarCampo,
    ...validarJWT
}