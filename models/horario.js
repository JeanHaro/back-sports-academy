const { Schema, model } = require('mongoose');

// Estructura del horario
const HorarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    cant_matriculas: {
        type: Number,
        require: true
    },
    turno: {
        type: String,
        require: true
    },
    edad_min: {
        type: Number,
        require: true
    },
    edad_max: {
        type:Number,
        require: true
    },
    hora_inicial: {
        type: String,
        require: true
    },
    hora_final: {
        type: String,
        require: true
    },
    fecha_inicial: {
        type: Date,
        require: true
    },
    fecha_final: {
        type: Date,
        require: true
    },
    admin: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
})

// Sobrescribir el método
HorarioSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = model('Horario', HorarioSchema);