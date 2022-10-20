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
    rango_edad: {
        type: String,
        require: true
    },
    rango_hora: {
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
    },
    registros: { 
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Registro'
    }
})

// Sobrescribir el método
HorarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Horario', HorarioSchema);