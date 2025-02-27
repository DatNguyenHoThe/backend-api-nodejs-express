import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt';

const saltRounds = 10;

const staffSchema = new Schema({
    first_name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        require: true,
    },
    last_name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        require: true,
    },
    email: {
        type: String,
        maxlength: 50,
        require: true,
        unique: true,//duy nhất
        validate: {
            validator: function (v: string) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: (props: {value: string}) => `${props.value} is not a valid email`
        }
    },
    active: {
        type: Boolean,
        enum: ["true", "false"],
        defaut: true
    },
    password: {
        type: String,
        maxlength: 255,
        require: true
    }
},
{
    timestamps: true,
});

//Middleware pre save ở lớp database
//trước khi data được lưu xuống ---> mã khóa mật khẩu

/* staffSchema.pre('save', async function (next) {
    const staff = this;

    if (!staff.password) {
        return next(new Error("Password is required"));
    }

    const hash = bcrypt.hashSync(staff.password, saltRounds);

    staff.password = hash;

    next();
}) */

export default model('staffs', staffSchema)