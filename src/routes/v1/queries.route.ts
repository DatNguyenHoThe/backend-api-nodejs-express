import express from 'express';
import Product from '../../models/product.models'
const router = express.Router();


//get all
/* router.get('/queries', async(req, res) => {
    console.log('queries')
    // find()
    const products = await Product.find();
    return res.status(200).json(products);
}) */
//get by id
router.get('/queries/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
})

// SELECT TOP 1 FROM product WHERE discout = 50
router.get('/queries', async(req, res) => {
    /* const product = await Product.findOne({
        discount = 50
    }); */

// Lấy tất cả những thuộc tính cần thiết

/* const products = await Product
.find()
.select('product_name price discount')

res.status(200).json(products);
*/


//5. Lấy tất cả các trường trừ createdAt và updatedAt
/* const products = await Product
.find()
.select('-createdAt updatedAt')

 */
//6. Sắp xếp tăng dần, giảm dần
/* const products = await Product
.find()
.select('-createdAt updatedAt')
.sort({
    product_name: 1, // tăng dần
    price: -1 // giảm dần
})
res.json(products); */

//7. tìm kiếm với so sánh bằng
/* const product = await Product
.find({
    model_year: 2492
    // price: {$qt: 1068.75} --> đang lỗi định dạng
})
res.status(200).json(product); */

//10. Update product WHERE id = xxx
/* const result = await Product.findByIdAndUpdate("67b479aef8df8c568102efd8", {
    price: 1000
},
{
    new: true, // trả về result là đữ liệu đã update
})
res.json(result); */
//11. Update product SET discount = 10 WHERE model_year = xxx
/* const result = await Product.findOneAndUpdate(
    {
        model_year: 2492
    },
    {
        discount: 80
    },
    {
        new: true, // trả về result là đữ liệu đã update 
    }
)
res.json(result); */

//12.Lấy và Phân trang
/* const currentPage = 1;
const pageSize = 10;
const product = await Product
.find()
.skip((currentPage - 1)*pageSize)
.limit(pageSize)
res.json(product); */

//13. left join nhiều collection với populate
/* const product = await Product
.find()
.populate('category',"category_name")// join với category
.populate('brand_id', "brand_name")// join với brand
res.json(product); */

//14. Toán tử tìm kiếm
/* const product = await Product
.find({
    product_name: new RegExp(/Soft/, 'i') // tìm kiếm tên sp gần đúng
})
.populate('category',"category_name")// join với category
.populate('brand_id', "brand_name")// join với brand
res.json(product); */

//🔶 Truy vấn cơ bản
//1. Tìm kiếm tất cả
/* const products = await Product.find();
res.json(products); */

//2.Chọn các trường cần thiết 
/* const products = await Product
.find()
.select('product_name price');

res.status(200).json(products); */

//3. Tìm kiếm và sắp xếp
/* const products = await Product
.find()
.select('product_name price')
.sort({
    product_name: 1, // sắp xếp tăng dần
    price: -1, // sắp xếp giảm dần
})

res.json(products); */

//4. Tìm kiếm với điều kiện
// SELECT * FROM Tank WHERE discount = 18
/* const products = await Product
.find({
    discount: 18
})

res.json(products); */

//5. Tìm một tài liệu
// SELECT TOP 1 * FROM Tank WHERE model_year = 2880
/* const product = await Product
.findOne({
    model_year: 2880
}) */

//6. Tìm theo ID
/* const product = await Product.findById("67b479aef8df8c568102efd4");

res.json(product); */

//7. Tìm kiếm với các Toán tử

//----$eq (So sánh bằng)-----//
/* const product = await Product
.find({
    model_year: {$eq: 2880}
})

res.json(product); */

//----$ne (không bằng)-----//
/* const product = await Product
.find({
    model_year:{ $ne: 2880 }
})

res.json(product); */

//----$ne (không bằng)-----//


}); 
export default router