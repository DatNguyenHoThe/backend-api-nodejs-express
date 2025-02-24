import express from 'express';
import staffsController from '../../controllers/staffs.controller';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

router.get('/staffs', staffsController.getAll);

//Get category by id
router.get('/staffs/:id', staffsController.getById);

//Create category
//POST /api/v1/staffs
router.post('/staffs', staffsController.Create);

//Update category
//PUT /api/v1/staffs/:id
router.put('/staffs/:id', staffsController.Update);

//Delete category
//DELETE /api/v1/staffs/:id
router.delete('/staffs/:id', staffsController.Delete);

export default router;
