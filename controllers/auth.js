const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");

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
        const token = await generarJWT(usuario.id);


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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;
    const salt = bcryptjs.genSaltSync();
    const pass = bcryptjs.hashSync('', salt);

    try {
        const { correo, nombre, img } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        if(!usuario){

            const data = {
                nombre,
                correo,
                contrasenia: pass,
                img,
                google: true 

            };
            usuario = new Usuario (data);
            await usuario.save();
        }

        //Si el usuario en DB 
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Comuniquese con un administrador //USUARIO BLOQUEADO'
            });
        }
        //Generar el jwt
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Todo bien',
            token,
            usuario
        })

    } catch (error) {
        res.status(400).json({
            ok: 'false',
            msg: 'No ha sido posible verificar el token'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}
