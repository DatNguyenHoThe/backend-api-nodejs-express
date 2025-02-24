import createError from 'http-errors';
import Brand from '../models/brand.models';
import { IBrandCreate } from '../types/model';

/**
 * Service :
 * - Nhận đầu vào từ controller
 * - Xử lý logic
 * - Lấy dữ liệu về cho Controller
 */

// get all brands
const getAll = async(query: any) => {

    const { page = 1, limit = 10 } = query;

    let sortObject = {};
    const sortType = query.sort_type || 'desc';
    const sortBy = query.sort_by || 'createdAt';
    sortObject = { ...sortObject, [sortBy]: sortType === 'desc' ? -1 : 1};

    console.log('sortObject: ', sortObject);

    //tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên brand
    if(query.brand_name && query.brand_name.length > 0) {
        where = { ...where, brand_name: {$regex: query.brand_name, $options: 'i'} };
    }

    const brands = await Brand
    .find(where)
    .skip((page-1)*limit)
    .limit(limit)
    .sort({...sortObject});

    //Đếm tổng số record hiện có của collection Brand
    const count = await Brand.countDocuments(where);

    return {
        brands,
        pagination: {
            totalRecord: count,
            limit,
            page
        }
    };


}
// get by Id
const getById = async(id: string) => {
    const brand = await Brand.findById(id);
        if (!brand) {
            //throw new Error("brand not found");
            throw createError(404, "brand not found");
        }
        return brand;
}
// create brand
const create = async(payload: IBrandCreate) => {
        //kiểm tra xem brand tạo mới có tên giống với các brand sẵn có không
        const brandExist = await Brand.findOne({brand_name: payload.brand_name});
        if(brandExist) {
            throw createError(400, 'Brand already exists')
        }

        //tạo mới brand
        const brand = new Brand(payload);
        // lưu vào database
        await brand.save();
        // return về brand
        return brand;
}

const updateById = async(id: string, payload: IBrandCreate) => {
    //Kiểm tra xem id đã tồn tại chưa và trả về kết quả brand với id cần update
    const brand = await getById(id);
    //Kiểm tra xem tên brand tạo mới đã tồn tại chưa
    const brandExist = await Brand.findOne({brand_name: payload.brand_name});
    if(brandExist) {
        throw createError(400, 'Brand already exists')
    }
        //Cập nhật brand
        Object.assign(brand, payload); // trộn dữ liệu mới và cũ lại với nhau
        await brand.save();
        return brand;
}

const deleteById = async(id: string) => {
        //Kiểm tra xem id brand cần xóa có chưa và trả về kết quả brand có id đó
        const brand = getById(id);
        //xóa sản phầm
        await Brand.deleteOne({_id: brand})
        return brand;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}
