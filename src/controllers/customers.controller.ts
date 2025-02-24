import { NextFunction, Request, Response } from 'express';
import customersService from '../services/customers.service';
import  {httpStatus, sendJsonSuccess}  from '../helpers/response.helper';

/**
 * Controller:
 * - Nhận request từ route
 * - NHận kết quả từ revice tương ứng
 * - Response lai cho client
 * - Không nên xử lý logic nghiệp vụ ở controller
 */

// Get all customers
const getAll = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const customer = await customersService.getAll();
        sendJsonSuccess(res, customer, httpStatus.OK.statusCode, httpStatus.OK.message);
    }
    catch(error) {
        next(error);
    }
    
}
//  Get customer by id
const getById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await customersService.getById(id);
    sendJsonSuccess(res, customer, httpStatus.OK.statusCode, httpStatus.OK.message);
}

// Create customer
const Create = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const payload = req.body;
        const customer = await customersService.create(payload);
        sendJsonSuccess(res, customer, httpStatus.CREATED.statusCode, httpStatus.CREATED.message);
    }
    catch(error) {
        next(error);
    }
    
}
// Update customer
const Update = async(req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const newcustomer = customersService.updateById(Number(id), payload);
        res.status(200).json({
            customer: newcustomer,
            message: 'customers updated successfully'
        });
}
// Delete customer
const Delete = async(req: Request, res: Response) => {
    const { id } = req.params;
    const customer = customersService.deleteById(Number(id));
        res.status(204).json({
            customer,
            message: 'customers deleted successfully'
        });
}

export default {
    getAll,
    getById,
    Create,
    Update,
    Delete
}