import { Schema, model } from 'mongoose'


const orderSchema = new Schema({
    customer_id: {
        type: Number,
        require: true
    },
    order_status: {
        type: Number,
        enum: [1,2,3,4],
        require: true
    },
    order_date: {
        type: String,
        maxlength: 50,
        default: () => new Date().toISOString
    },
    require_date: Date,
    shipping_date: {
        type: Date,
        require: true
    },
    staff_id: {
        type: Number,
        maxlength: 20,
        require: true
    },
    order_note: String,
    street: {
        type: String,
        maxlength: 255,
        require: true
    },
    city: {
        type: String,
        maxlength: 50,
        require: true
    },
    state: {
        type: String,
        maxlength: 50,
        require: true
    },
    payment_type: {
        type: Number,
        enum: [1,2,3,4],
        require: true
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model('orders', orderSchema)