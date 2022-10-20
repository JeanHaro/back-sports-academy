const { Schema, model } = require('mongoose');

const RegistroSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    celular: {
        type: Number,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    matricula: {
        type: Boolean,
        require: true,
        default: true
    },
    pago1: {
        type: Boolean,
        require: true,
        default: false
    },
    pago2: {
        type: Boolean,
        require: true,
        default: false
    },
    pago3: {
        type: Boolean,
        require: true,
        default: false
    },
    pago4: {
        type: Boolean,
        require: true,
        default: false
    },
    admin: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    horario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Horario'
    }
});

// Sobrescribir el método
RegistroSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Registro', RegistroSchema);