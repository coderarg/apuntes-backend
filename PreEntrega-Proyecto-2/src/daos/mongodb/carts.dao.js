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

    async addProdToCart(cid, product){
        try {
            const cart = await CartsModel.findById(cid);
            const prodExist = cart.products.find((p)=>{
                console.log(p.id);
                return p.id == product.id;
            })
            if(prodExist){
                prodExist.quantity += 1
            }else{
                cart.products.push({
                    id: product._id,
                    quantity: 1
                })
            }
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
}