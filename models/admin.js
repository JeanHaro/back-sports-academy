const { Schema, model } = require('mongoose');

// Estructura del admin
const AdminSchema = Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    code: {
        type: Boolean,
        default: false,
        require: true,
    }
})

// Sobrescribir el método
AdminSchema.method('toJSON', function() {
    const { _id, __v, password, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = model('Admin', AdminSchema)