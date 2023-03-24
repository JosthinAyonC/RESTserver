

const {Schema, model} = require('mongoose');

const RoleShechema = Schema({

    rol:{
        type:String,
        required: [true, 'el rol es obligatorio']
    }

});

module.exports =  model('Role', RoleShechema);
