
const {Schema, model} = require('mongoose');



const UsuarioSchema = Schema({
    
        nombre:{
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        correo :{
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },
        contrasenia: {
            type: String,
            required: [true, 'La contrasenia es obligatoria']
        },
        img:{
            type: String,
        },
        rol:{
            type: String,
            required:true,
            enum: ['ADMIN_ROLE', 'USER_ROLE']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
    
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, contrasenia, _id: uid, ...rest } = this.toObject();
   
    return {
      uid,
      ...rest
    }
}

module.exports = model( 'Usuario',UsuarioSchema );