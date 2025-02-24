import { Schema, model } from 'mongoose'

const staffSchema = new Schema({
    first_name: {
        type: String,
        maxlength: 50,
        require: true,
    },
    last_name: {
        type: String,
        maxlength: 50,
        require: true,
    },
    phone: {
        type: String,
        maxlength: 50,
        require: true,
        unique: true,//duy nhất
    },
    email: {
        type: String,
        maxlength: 50,
        require: true,
        unique: true,//duy nhất
    },
    active: {
        type: Number,
        enum: [0,1],
        defaut: 0
    },
    store_id: Number,
    manage_id: Number,
    password: {
        type: String,
        maxlength: 255,
        default: null
    }
});

export default model('staffs', staffSchema)