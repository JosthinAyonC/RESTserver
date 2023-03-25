const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { validarReq } = require('../middlewares/validarCampos');



const usuarioGet = async (req, res = response) => {

    const { limit = 5, since = 0 } = req.query;
    //varible para ver si es un ususario que se encuentra activo la db o no 
    //(cabe recalcar que los usuarios no activos no se borran)
    const activo = { estado: true }; 

    //funcion para validar si los argumentos pasados por query son noNumericos
    const validation = validarReq(limit, since);

    if (!validation.valido) {
        return res.status(400).json({validation});
    }

    //Promise.all ejecuta las promesas (await) de manera simultanea
    const [total, usuarios] = await Promise.all([ 
            Usuario.countDocuments(activo),
            Usuario.find(activo)
                .skip(Number(since)) //Manda por el argumento get desde donde busca registros
                .limit(Number(limit))
        ])

    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req, res = response) => {

    //devuelve un objeto de errores que se encuentran en la peticion


    const { nombre, correo, contrasenia, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, contrasenia, rol });

    //Verificacion de correo

    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);

    //guardar en base de datos
    await usuario.save();



    res.json({
        msg: "Usuario creado satisfactoriamente",
        usuario
    });
}

const usuarioPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, contrasenia, google, correo, ...resto } = req.body;

    if (contrasenia) {

        const salt = bcryptjs.genSaltSync();
        resto.contrasenia = bcryptjs.hashSync(contrasenia, salt);

    }

    const usuarioDb = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "Usuario actualizado satisfactoriamente",
        usuarioDb
    });
}


const usuarioDelete = async (req, res = response) => {

    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id); //borra de la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false}); //Lo hace invisible en la db(Lo borra)

    res.json({
        msg: "Usuario eliminado",
        usuario
    });
}


module.exports = {
    usuarioGet,
    usuarioDelete,
    usuarioPost,
    usuarioPut
}