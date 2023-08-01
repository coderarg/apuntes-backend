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
            const cartById = await CartsModel.findById(idNumber).populate('products')
            return cartById;
        } catch (error) {
            console.log(error);
        }
    }

    async addProdToCart(cid, pid){
        try {
            const cart = await CartsModel.findById(cid);
            cart.products.push(pid);
            cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}