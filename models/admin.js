import { Schema, model } from 'mongoose';

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
    }
})

module.exports = model('Admin', AdminSchema)