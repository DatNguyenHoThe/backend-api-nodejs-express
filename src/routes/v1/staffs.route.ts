import express from 'express';
import staffsController from '../../controllers/staffs.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import staffsValidation from '../../validations/staffs.validation';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

//get all
router.get('/staffs', validateSchemaYup(staffsValidation.getAllSchema), staffsController.getAll);

//Get category by id
router.get('/staffs/:id', validateSchemaYup(staffsValidation.getByIdSchema), staffsController.getById);

//Create category
//POST /api/v1/staffs
router.post('/staffs', validateSchemaYup(staffsValidation.createSchema), staffsController.Create);

//Update category
//PUT /api/v1/staffs/:id
router.put('/staffs/:id', validateSchemaYup(staffsValidation.updateByIdSchema), staffsController.Update);

//Delete category
//DELETE /api/v1/staffs/:id
router.delete('/staffs/:id', staffsController.Delete);

export default router;
