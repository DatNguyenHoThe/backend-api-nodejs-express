import { Schema, model } from 'mongoose'

const customerSchema = new Schema({
    first_name: {
        type: String,
        maxlength:50,
        require: true
    },
    last_name: {
        type: String,
        maxlength:50,
        require: true
    },
    phone: {
        type: String,
        maxlength: 50,
        require: true,
        unique: true
    },
    email: {
        type: String,
        maxlength: 150,
        require: true,
        unique: true
    },
    birthday: String,
    street: {
        type: String,
        maxlength: 255,
        require: true
    },
    city: {
        type: String,
        maxlength: 255,
        require: true
    },
    state: {
        type: String,
        maxlength: 50,
        require: true
    },
    zip_code: {
        type: String,
        maxlength: 50,
    },
    password: {
        type: String,
        maxlength: 255,
        default: null
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('customers', customerSchema)