import orderModels from "../models/order.models";
import { IOderCreate } from "../types/model";
import createError from 'http-errors';


//get all
const getAll = async() => {
    try{
        const orders = await orderModels.find();
        return orders;
    }
    catch(error) {
        console.error(error);
        throw error;
    }

}
//get byID
const getById = async(id: string) => {
    try{
        const order = await orderModels.findById(id);
        if(!order) {
            throw createError(404, "order not found");
        }
        return order;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}
//create
const create = async(payload: IOderCreate) => {
    try{
        const order = new orderModels(payload);
        await order.save();
        return order;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}
//update by id
const updateById = async(id: string, payload: IOderCreate) => {
    try{
        const order = await orderModels.findById(id);
        if(!order){
            throw createError(404, 'order not found');
        }
        const index = orderModels.indexOf(order);
        orderModels[index] = payload;
        return order;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}
//delete
const deleteById = async(id: string) => {
    try{
        const order = await orderModels.findById(id);
        if(!order) {
            throw createError(404,'order not found');
        }
        const index = orderModels.indexOf(order);
        orderModels.splice(index, 1);
        return order
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

export default {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}