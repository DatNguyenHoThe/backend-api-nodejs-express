import express from 'express';
import customersController from '../../controllers/customers.controller';

const router = express.Router();

/* 
 * Route là để định tuyến path <==> controller nào 
*/

router.get('/customers', customersController.getAll);

//Get category by id
router.get('/customers/:id', customersController.getById);

//Create category
//POST /api/v1/customers
router.post('/customers', customersController.Create);

//Update category
//PUT /api/v1/customers/:id
router.put('/customers/:id', customersController.Update);

//Delete category
//DELETE /api/v1/customers/:id
router.delete('/customers/:id', customersController.Delete);

export default router;
