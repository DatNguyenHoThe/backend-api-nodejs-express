import {Schema, model} from 'mongoose';

const testSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    birthDay: Date,
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    
    roles: [String], //roles: [admin/user]
});

export default model('Test', testSchema);