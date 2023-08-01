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
}