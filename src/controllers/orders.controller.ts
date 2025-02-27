import ordersService from "../services/orders.service";
import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";


//get all
const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const orders = await ordersService.getAll();
        sendJsonSuccess(res, orders, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}
//get by id
const getById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const order = await ordersService.getById(id);
        sendJsonSuccess(res, order, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}
//create
const create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const order = ordersService.create(payload);
        sendJsonSuccess(res, order, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    }
    catch(error) {
        next(error);
    }
}
//update by ID
const updateById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const payload = req.body;
        const order = await ordersService.updateById(id, payload);
        sendJsonSuccess(res, order, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}
//delete
const deleteById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const order = await ordersService.deleteById(id);
        sendJsonSuccess(res, order, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}