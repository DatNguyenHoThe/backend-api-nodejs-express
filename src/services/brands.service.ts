import createError from 'http-errors';
import brandModels from '../models/brand.models';
import { IBrandCreate } from '../types/model';

/**
 * Service :
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu về cho Controller
 */

// get all brands
const getAll = async() => {
    try{
        const brands = await brandModels.find();
        return brands;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// get by Id
const getById = (id: string) => {
    const brand = brands.find(brand => brand.id == Number(id));
        if (!brand) {
            //throw new Error("brand not found");
            throw createError(404, "brand not found");
        }
        return brand;
}
// create brand
const create = async(payload: IBrandCreate) => {
    try{
        //tạo mới brand
        const brand = new brandModels(payload);
        // lưu vào database
        await brand.save();
        // return về brand
        return brand;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const brand = brands.find(s => s.id == Number(id));
        if(!brand){
            throw createError(404, 'brands not found');
        };
        const index = brands.indexOf(brand);
        brands[index] = payload;
        return brands[index];
}

const deleteById = (id: number) => {
    const brand = brands.find(s => s.id == Number(id));
        if(!brand){
            throw createError(404, 'brands not found');
        };
        const index = brands.indexOf(brand);
        brands.splice(index, 1);
        return brand;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
