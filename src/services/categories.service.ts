import createError from 'http-errors';
import Category from '../models/category.models';
import { ICategoryCreate } from '../types/model';
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
    // nếu có tìm kiếm theo tên danh mục
    if (query.category_name && query.category_name.length > 0) {
        where = { ...where, category_name: { $regex: query.category_name, $options: 'i'}};
    }
    const categories = await Category
    .find(where)
    .skip((page-1)*limit)
    .limit(limit)
    .sort({...sortObject});

    //Đếm tổng số record hiện có của collection Category
    const count = await Category.countDocuments(where);
    console.log('category: ', categories);

    return {
        categories,
        pagination: {
            totalRecord: count,
            limit,
            page
        }
    };
}

const getById = async(id: string) => {
    //const category = categories.find(category => category.id == Number(id));
    const category = await Category.findById(id)
        if (!category) {
            //throw new Error("Category not found");
            throw createError(404, "Category not found");
        }
        return category;
}

const create = async (payload: ICategoryCreate) => {
    //Kiểm tra xem có tồn tại danh mục có tên giống nhau không
    const categoryExist = await Category.findOne({category_name: payload.category_name});
    if(categoryExist) {
        throw createError(400,'category already existed')
    }
    const category = new Category({
        category_name: payload.category_name,
        description: payload.description,
        slug: buildSlug(payload.category_name)
    });
    // lưu vào database
    await category.save();
    // trả về item được tạo ra
    return category;
}

const updateById = async(id: string, payload: any) => {
    //kiểm tra xem id có tồn tại không
    const category = await getById(id);
    //Kiểm tra xem tên sản phẩm vừa cập nhật có trùng với các sản phẩm khác không
    if(payload.category_name !== category.category_name) {
        const categoryExist = await Category.findOne({ category_name: payload.category_name });
        if(categoryExist) {
            throw createError(400,'category_name already existed')
        }
    }
    //cập nhật sản phẩm
    if(payload.category_name) {
        payload.slug = buildSlug(payload.category_name);// cập nhật slug
    } 
    Object.assign(category, payload); // trộn dữ liệu mới và cũ
    await category.save();
    return category;
}

const deleteById = async(id: string) => {
    // kiểm tra xem id có tồn tại không
    const category = await getById(id);
    // thực hiện lệnh delete
    await Category.deleteOne({_id: category.id});
    return category;
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}