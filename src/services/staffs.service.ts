import createError from 'http-errors';
import Staff from '../models/staff.models';
import { buildSlug } from '../helpers/slugify.helper';
/**
 * Service :
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu về cho Controller
 */

const getAll = async(query: any) => {
    const { page = 1, limit = 10} = query;
    let sortObject = {};
    const sortType = query.sort_type || 'desc';
    const sortBy = query.sort_by || 'createdAt';
    sortObject = {...sortObject, [sortBy]: sortType === 'desc' ? -1 : 1};

    console.log('sortObject : ', sortObject);
    console.log(query);

    //Tìm kiếm theo điều kiện
    let where = {};
    // nếu có tìm kiếm theo tên nhân viên
    if (query.first_name && query.first_name.length > 0) {
        where = { ...where, first_name: { $regex: query.first_name, $options: 'i'}}; // $options: 'i': không phân biệt chữ hoa và chữ thường
    }
    const staffs = await Staff
    .find(where)
    .skip((page-1)*limit)
    .limit(limit)
    .sort({...sortObject});

    //Đếm tổng số record hiện có của collection staff
    const count = await Staff.countDocuments(where);
    console.log('staff: ', staffs);

    return {
        staffs,
        pagination: {
            totalRecord: count,
            limit,
            page
        }
    };
}

const getById = async(id: string) => {
    //const staff = staffs.find(staff => staff.id == Number(id));
    const staff = await Staff.findById(id)
        if (!staff) {
            //throw new Error("staff not found");
            throw createError(404, "staff not found");
        }
        return staff;
}

const create = async (payload: any) => {
    //kiểm tra xem email có tồn tại không
    const emailExist = await Staff.findOne({email: payload.email});
    if(emailExist) {
        throw createError(400, 'Email already exists');
    }
    const staff = new Staff(payload);
    // lưu vào database
    await staff.save();
    // trả về item được tạo ra
    return staff;
}

const updateById = async(id: string, payload: any) => {
    //kiểm tra xem id có tồn tại không
    const staff = await getById(id);

    //kiểm tra xem email có tồn tại không
    const emailExist = await Staff.findOne({email: payload.email});
    if(emailExist) {
        throw createError(400, 'Email already exists');
    }

    //cập nhật nhân viên
    Object.assign(staff, payload); // trộn dữ liệu mới và cũ
    await staff.save();
    return staff;
}

const deleteById = async(id: string) => {
    // kiểm tra xem id có tồn tại không
    const staff = await getById(id);
    // thực hiện lệnh delete
    await staff.deleteOne({_id: staff.id});
    return staff;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}