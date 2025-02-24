import { Schema, model } from 'mongoose';


const productSchema = new Schema({
    product_name: {
        type: String,
        maxlength: [255," Tối đa 255 ký tự"],
        require: true,
        unique: true
    },
        price: {
            type: Number,
            require: true,
            min: 0,
            default: 0
        },
        discount: {
            type: Number,
            min: 0,
            max: 70,
            require: false,
            default: 0,
        },
        description: {
            type: String,
            default: null
        },
        model_year: {
            type: Number,
            require: true
        },
        thumbnail: {
            type: String,
            maxlength: 255,
        },
        stock: {
            type: Number,
            min: 0,
            default: 10
        },
        //tham chiếu
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category', // tham chiếu đến _id model category
            require: true
        },
        brand_id: {
            type: Schema.Types.ObjectId,
            ref: 'brands', // tham chiếu đến _id model brands
            require: true
        }
},
{
    timestamps: true,
    versionKey: false
})

export default model('products', productSchema)