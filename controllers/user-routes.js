const {  response , request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuarioGet = (req, res = response) => {
    
    const {nombre, email} = req.query;
    
    res.json({
        msg: "get API - controlador",
        nombre,
        email
    });
}

const usuarioPost = async(req, res = response) => {

    //devuelve un objeto de errores que se encuentran en la peticion
    
    
    const {nombre, correo, contrasenia, rol} = req.body;
    const usuario = new Usuario({nombre, correo, contrasenia, rol});
    
    //Verificacion de correo

    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.contrasenia = bcryptjs.hashSync( contrasenia, salt );

    //guardar en base de datos
    await usuario.save();

    

    res.json({
        msg: "Usuario creado satisfactoriamente",
        usuario
    });
}

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: "put API - controlador",
        id
    });
}


const usuarioDelete = (req, res = response) => {

    res.json({
        msg: "delete API - controlador"
    });
}

const usuarioPatch = (req, res = response) => {

    res.json({
        msg: "patch API - controlador"
    });
}

module.exports = {
    usuarioGet, 
    usuarioDelete,  
    usuarioPost, 
    usuarioPut,
    usuarioPatch
}