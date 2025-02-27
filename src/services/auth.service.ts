import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import Staff from '../models/staff.models';
import { env } from '../helpers/env.helper';
import { Response } from 'express';

const login = async({
    email,
    password,
} : {
    email: string,
    password: string,
}) => {
        //logic đăng nhập
    //kiểm tra email có tồn tại không
    const staff = await Staff.findOne({email});
    if(!staff) {
        //báo lỗi chung chung
        //lý do để hacker không biết email đúng hay sai
        throw createError(400,'Email or password is invalid');
    }

    //kiểm tra mật khẩu
    // nếu mật khẩu chưa được mã hóa
    if(staff.password !== password) {
        throw createError(400, 'Email or password is invalid');
    }
    //login thành công
    //Tạo accessToken
    const accessToken = jwt.sign(
        { _id: staff._id, email: staff.email},
        env.JWT_SECRET as string,
        {
            expiresIn: '24h', //expires in 24 hours (24x60x60)
        }
    );

    const refreshToken = jwt.sign(
        {_id: staff._id, email: staff.email},
        env.JWT_SECRET as string,
        {
            expiresIn: '365d', // expires in 24 hours (24x60x60)
        }
    );
    return {
        accessToken,
        refreshToken
    }
}

const getProfile = async(res: Response) => {
    const {staff} = res.locals;
    return staff;
}

export default {
    login,
    getProfile
}