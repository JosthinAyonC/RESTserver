const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { correo, contrasenia } = req.body;

    try {
        //Ver si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Correo no registrado'
            })
        }
        //validar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }
        //Verificar contrasenia
        const validPassword = bcryptjs.compareSync(contrasenia, usuario.contrasenia);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contrasenia: incorrecta'
            })
        }
        //Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal'
        })
    }



}

module.exports = {
    login
}
