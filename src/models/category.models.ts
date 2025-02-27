import { Schema, model } from 'mongoose';

// định nghĩa cấu trúc collection category

const categorySchema = new Schema({
    category_name: {
        type: String,
        required: true, //NOT NULL
        unique: true, // duy nhất
        minlength: [3, 'độ dài tối thiểu phải là 3 ký tự'], // độ dài tối thiểu
        maxlength: 50, // độ dài tối đa
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true, // xóa ký tự trắng ở đầu và cuối chuỗi
        default: "" // giá trị mạc định khi tạo mới
    },
    slug: {
        type: String,
        maxlength: 50,
        minlength: 3,
        require: true,
        unique: true,
        lowercase: true
    }
},
    {
        timestamps: true, // tự động sinh ra 2 trường createdAt và updatedAt
        versionKey: false, // bỏ đi trường _v
        //collection: "categories" // tùy chỉnh tên collection
    }
);

export default model('Category', categorySchema);