const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay un token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid); // Lee el usuario que deseo extraer por su id

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en la DB'
            })
        }
        
        // if (!usuario.estado) {
        //     return res.status(401).json({
        //         msg: 'Token no validoss'
        //     })
        // }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = {
    validarJWT
}   