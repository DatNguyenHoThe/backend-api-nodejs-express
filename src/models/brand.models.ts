import { Schema, model} from 'mongoose'

const brandSchema = new Schema ({
    brand_name: {
        type: String,
        unique: true,// duy nhất
        require: true,
        minlength: 4,
        maxlength: 100,
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true, // xóa ký tự trắng ở đầu và cuối
        default: ""
    }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('brands', brandSchema)