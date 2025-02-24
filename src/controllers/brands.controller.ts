import { NextFunction, Request, Response } from 'express';
import brandsService from '../services/brands.service';
import  {sendJsonSuccess, httpStatus}  from '../helpers/response.helper';

/**
 * Controller:
 * - Nhận request từ route
 * - NHận kết quả từ revice tương ứng
 * - Response lai cho client
 * - Không nên xử lý logic nghiệp vụ ở controller
 */


// Get all brands
const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const brands = await brandsService.getAll(req.query);
    sendJsonSuccess(res, brands, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch (error){
        next(error);
    }
    
}
//  Get brand by id
const getById = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const brand = await brandsService.getById(id);
        sendJsonSuccess(res, brand, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
}

// Create brand
const Create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const brand = await brandsService.create(payload);
        sendJsonSuccess(res, brand, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    }
    catch(error) {
        next(error);
    }
    
}
// Update brand
const Update = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const payload = req.body;
        const brand = await brandsService.updateById(id, payload);
        sendJsonSuccess(res, brand, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next (error);
    }
}
// Delete brand
const Delete = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params;
        const brand = await brandsService.deleteById(id);
        sendJsonSuccess(res, brand, httpStatus.OK.statusCode, httpStatus.OK.message);
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