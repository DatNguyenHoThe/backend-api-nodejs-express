import express, { NextFunction } from 'express';
import categoriesController from '../../controllers/categories.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import categoriesValidation from '../../validations/categories.validation';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

// khai báo 1 middleware routes
const routerMiddleware = (req, res, next) => {
    console.log('Tác động toàn bộ route dưới Middleware','Router Middleware');
    next();
}
router.use(routerMiddleware); // khi sử dụng ở đây nó sẽ tác động đến toàn bộ route ở dưới

// khai báo 1 route riêng cho url categories/:id cà sử dụng trong route đó
const privateMiddleware = (req, res, next) => {
    console.log('Route của categories/:id', 'Private Middleware');
    next();
}

//Get all categories
router.get('/categories', validateSchemaYup(categoriesValidation.getAllSchema), categoriesController.getAll);

//Get category by id
router.get('/categories/:id',validateSchemaYup(categoriesValidation.getByIdSchema) , categoriesController.getById);

//Create category
//POST /api/v1/categories
router.post('/categories', validateSchemaYup(categoriesValidation.createSchema), categoriesController.Create);

//Update category
//PUT /api/v1/categories/:id
router.put('/categories/:id', validateSchemaYup(categoriesValidation.updateByIdSchema) ,categoriesController.Update);

//Delete category
//DELETE /api/v1/categories/:id
router.delete('/categories/:id', categoriesController.Delete);

export default router;
