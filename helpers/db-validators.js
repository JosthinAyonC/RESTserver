const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }

}

const emailExiste = async (correo = '') => {
   
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error(`Este correo ya se encuentra registrado` );
    }
    
}


module.exports = {
    esRoleValido,
    emailExiste
}