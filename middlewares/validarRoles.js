const { response } = require("express")
const { validarJWT } = require("./validaJWT")


const esAdminRole = (req, res = response ,next) =>{
    
    if (!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin verificar el token primero'
        })
    }
    const{rol, nombre} = req.usuario;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre}, no tienes permisos necesarios para ejecutar esta funcion`
        })
    }

    next();
}
const tieneRol = ( ...roles ) =>{
    return  (req, res = response, next) =>{
       
        if (!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin verificar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles: ${ roles }`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRol
}
