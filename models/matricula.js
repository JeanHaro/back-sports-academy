const { Schema, model } = require('mongoose');

const MatriculaSchema = Schema({
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
        require: true,
        unique: true
    },
    celular: {
        type: Number,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    codigo: {
        type: String,
        require: true
    },
    matricula: {
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
MatriculaSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();

    object.uid = _id;

    return object;
});

module.exports = model('Matricula', MatriculaSchema);