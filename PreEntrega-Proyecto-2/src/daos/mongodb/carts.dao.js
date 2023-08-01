import { CartsModel } from './model/carts.model.js';

export default class CartsDaoMongoDB {
    
    async createCart(){
        try {
            const newCart = await CartsModel.create({});
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idNumber){
        try {
            const cartById = await CartsModel.findById(idNumber)
            return cartById;
        } catch (error) {
            console.log(error);
        }
    }
}