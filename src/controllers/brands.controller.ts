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

const brands = [
    {
        id: 1,
        name: "brand1"
    },
    {
        id: 2,
        name: "brand2"
    }
];
// Get all brands
const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const brands = await brandsService.getAll();
    sendJsonSuccess(res, brands, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch (error){
        next(error);
    }
    
}
//  Get brand by id
const getById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const brand = brandsService.getById(Number(id));
    res.status(200).json(brand);
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
const Update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const newbrand = brandsService.updateById(Number(id), payload);
        res.status(200).json({
            brand: newbrand,
            message: 'brands updated successfully'
        });
}
// Delete brand
const Delete = async(req: Request, res: Response) => {
    const { id } = req.params;
    const brand = brandsService.deleteById(Number(id));
        res.status(204).json({
            brand,
            message: 'brands deleted successfully'
        });
}

export default {
    getAll,
    getById,
    Create,
    Update,
    Delete
}