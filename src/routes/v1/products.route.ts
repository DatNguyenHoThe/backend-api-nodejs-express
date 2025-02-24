import productsController from "../../controllers/products.controller";
import express from "express";

const router = express.Router();

//tạo route get all
router.get('/products', productsController.getAll);
//tạo route get by id
router.get('/products/:id', productsController.getById);
//tạo route create
router.post('/products', productsController.create);
//tạo route update by id
router.put('/products/:id', productsController.updateById);
//tạo route delete by id
router.delete('/products/:id', productsController.deleteById);

export default router;