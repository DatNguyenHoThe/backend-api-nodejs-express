import createError from 'http-errors';
import customerModels from '../models/customer.models';
import { ICustomerCreate } from '../types/model';

/**
 * Service :
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu về cho Controller
 */

// get all customers
const getAll = async() => {
    try{
        const customers = await customerModels.find();
        return customers;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// get by Id
const getById = (id: string) => {
    const customer = customers.find(customer => customer.id == Number(id));
        if (!customer) {
            //throw new Error("customer not found");
            throw createError(404, "customer not found");
        }
        return customer;
}
// create customer
const create = async(payload: ICustomerCreate) => {
    try{
        //tạo mới customer
        const customer = new customerModels(payload);
        // lưu vào database
        await customer.save();
        // return về customer
        return customer;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const customer = customers.find(s => s.id == Number(id));
        if(!customer){
            throw createError(404, 'customers not found');
        };
        const index = customers.indexOf(customer);
        customers[index] = payload;
        return customers[index];
}

const deleteById = (id: number) => {
    const customer = customers.find(s => s.id == Number(id));
        if(!customer){
            throw createError(404, 'customers not found');
        };
        const index = customers.indexOf(customer);
        customers.splice(index, 1);
        return customer;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
