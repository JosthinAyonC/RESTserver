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

const existeUsuario = async (_id = '') => {
   
    const usuarioEx = await Usuario.findOne({ _id });

    if (!usuarioEx) {
        throw new Error(`No se ha encontrado un ususario con id ${_id}` );
    }
    
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuario
}