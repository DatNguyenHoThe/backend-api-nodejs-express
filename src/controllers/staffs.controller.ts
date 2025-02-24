import { NextFunction, Request, Response } from 'express';
import staffsService from '../services/staffs.service';
import  {httpStatus, sendJsonSuccess}  from '../helpers/response.helper';

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
        const staff = await staffsService.getAll();
        sendJsonSuccess(res, staff, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
    
}
//  Get staff by id
const getById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const staff = await staffsService.getById(id);
    sendJsonSuccess(res, staff, httpStatus.OK.statusCode, httpStatus.OK.message);
}

// Create staff
const Create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const staff = await staffsService.create(payload);
        sendJsonSuccess(res, staff, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    }
    catch(error) {
        next(error);
    }
    
}
// Update staff
const Update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const newstaff = staffsService.updateById(Number(id), payload);
        res.status(200).json({
            staff: newstaff,
            message: 'staffs updated successfully'
        });
}
// Delete staff
const Delete = async(req: Request, res: Response) => {
    const { id } = req.params;
    const staff = staffsService.deleteById(Number(id));
        res.status(204).json({
            staff,
            message: 'staffs deleted successfully'
        });
}

export default {
    getAll,
    getById,
    Create,
    Update,
    Delete
}