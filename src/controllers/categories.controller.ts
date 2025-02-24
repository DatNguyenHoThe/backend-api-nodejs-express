import { NextFunction, Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import  {sendJsonSuccess, httpStatus}  from '../helpers/response.helper';

/**
 * Controller:
 * - Nhận request từ route
 * - NHận kết quả từ revice tương ứng
 * - Response lai cho client
 * - Không nên xử lý logic nghiệp vụ ở controller
 */
// Get all categories
const getAll = async(req: Request, res: Response) => {
    const categories = await categoriesService.getAll(req.query);
    sendJsonSuccess(res, categories, httpStatus.OK.statusCode, httpStatus.OK.message);
}
//  Get category by id
const getById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoriesService.getById(id);
    sendJsonSuccess(res, category, httpStatus.OK.statusCode, httpStatus.OK.message);
}

// Create category
const Create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const category = await categoriesService.create(payload);
        sendJsonSuccess(res, category, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    } catch (error) {
        next(error)
    }
}
// Update category
const Update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const newCategory = categoriesService.updateById(Number(id), payload);
        res.status(200).json({
            category: newCategory,
            message: 'categories updated successfully'
        });
}
// Delete category
const Delete = async(req: Request, res: Response) => {
    const { id } = req.params;
    const category = categoriesService.deleteById(Number(id));
        res.status(204).json({
            category,
            message: 'categories deleted successfully'
        });
}

export default {
    getAll,
    getById,
    Create,
    Update,
    Delete
}