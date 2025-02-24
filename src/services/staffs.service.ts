import createError from 'http-errors';
import staffModels from '../models/staff.models';
import { IStaffCreate } from '../types/model';

/**
 * Service :
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu về cho Controller
 */

// get all staffs
const getAll = async() => {
    try{
        const staffs = await staffModels.find();
        return staffs;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// get by Id
const getById = (id: string) => {
    const staff = staffs.find(staff => staff.id == Number(id));
        if (!staff) {
            //throw new Error("staff not found");
            throw createError(404, "staff not found");
        }
        return staff;
}
// create staff
const create = async(payload: IStaffCreate) => {
    try{
        //tạo mới staff
        const staff = new staffModels(payload);
        // lưu vào database
        await staff.save();
        // return về staff
        return staff;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const staff = staffs.find(s => s.id == Number(id));
        if(!staff){
            throw createError(404, 'staffs not found');
        };
        const index = staffs.indexOf(staff);
        staffs[index] = payload;
        return staffs[index];
}

const deleteById = (id: number) => {
    const staff = staffs.find(s => s.id == Number(id));
        if(!staff){
            throw createError(404, 'staffs not found');
        };
        const index = staffs.indexOf(staff);
        staffs.splice(index, 1);
        return staff;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
