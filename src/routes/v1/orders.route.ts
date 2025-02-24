import ordersController from '../../controllers/orders.controller'
import express from 'express'

const router = express.Router();

//get all
router.get('/orders', ordersController.getAll);
//get by id
router.get('/orders/:id', ordersController.getById);
//create
router.post('/orders', ordersController.create);
//update by id
router.put('/orders', ordersController.updateById);
//delete by id
router.delete('/orders/:id', ordersController.deleteById);

export default router