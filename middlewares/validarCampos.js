const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

const validarReq = (limit, since) => {

    if (isNaN(limit) || isNaN(since)) {
        
        if (isNaN(limit)) {
            msg = {
                limit,
                msg: 'Valor no valido'
                };
        }
        if (isNaN(since)) {
            msg = {
                since,
                msg: 'Valor no valido'
            };
        }
        return {
            valido: false,
            msg
        };
    } else {
        return { valido: true };
    }

}



module.exports = {
    validarCampos,
    validarReq
}