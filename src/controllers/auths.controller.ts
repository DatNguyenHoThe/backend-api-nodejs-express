import {Request, Response, NextFunction } from "express";
import authService from '../services/auth.service';
import { httpStatus, sendJsonSuccess } from "../helpers/response.helper";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const tokens = await authService.login({
            email: req.body.email,
            password: req.body.password
        });
        sendJsonSuccess(res, tokens, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const staff = await authService.getProfile(res);
        sendJsonSuccess(res, staff, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}

export default {
    login,
    getProfile
}