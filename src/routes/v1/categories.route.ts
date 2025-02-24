import express from 'express';
import categoriesController from '../../controllers/categories.controller';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

router.get('/categories', categoriesController.getAll);

//Get category by id
router.get('/categories/:id', categoriesController.getById);

//Create category
//POST /api/v1/categories
router.post('/categories', categoriesController.Create);

//Update category
//PUT /api/v1/categories/:id
router.put('/categories/:id', categoriesController.Update);

//Delete category
//DELETE /api/v1/categories/:id
router.delete('/categories/:id', categoriesController.Delete);

export default router;
