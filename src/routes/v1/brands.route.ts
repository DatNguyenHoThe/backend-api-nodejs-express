import express from 'express';
import brandsController from '../../controllers/brands.controller';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

router.get('/brands', brandsController.getAll);

//Get category by id
router.get('/brands/:id', brandsController.getById);

//Create category
//POST /api/v1/brands
router.post('/brands', brandsController.Create);

//Update category
//PUT /api/v1/brands/:id
router.put('/brands/:id', brandsController.Update);

//Delete category
//DELETE /api/v1/brands/:id
router.delete('/brands/:id', brandsController.Delete);

export default router;
