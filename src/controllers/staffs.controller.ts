import { NextFunction, Request, Response } from 'express';
import staffsService from '../services/staffs.service';
import  {sendJsonSuccess, httpStatus}  from '../helpers/response.helper';

/**
 * Controller:
 * - Nhận request từ route
 * - NHận kết quả từ revice tương ứng
 * - Response lai cho client
 * - Không nên xử lý logic nghiệp vụ ở controller
 */
// Get all staffs
const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const staffs = await staffsService.getAll(req.query);
    sendJsonSuccess(res, staffs, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}
//  Get staff by id
const getById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const { id } = req.params;
        const staff = await staffsService.getById(id);
        sendJsonSuccess(res, staff, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}

// Create staff
const Create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const staff = await staffsService.create(payload);
        sendJsonSuccess(res, staff, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    } catch (error) {
        next(error);
    }
}
// Update staff
const Update = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const payload = req.body;
        const staff = await staffsService.updateById(id, payload);
        sendJsonSuccess(res, staff, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next (error);
    }
}
// Delete staff
const Delete = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const staff = staffsService.deleteById(id);
        res.status(204).json({
            staff,
            message: 'staffs deleted successfully'
        });
    }
    catch(error) {
        next (error);
    }
}

export default {
    getAll,
    getById,
    Create,
    Update,
    Delete
}