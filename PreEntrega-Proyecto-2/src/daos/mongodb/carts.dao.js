import { CartsModel } from './model/carts.model.js';

export default class CartsDaoMongoDB {

	async createCart() {
		try {
			const newCart = await CartsModel.create({});
			return newCart;
		} catch (error) {
			console.log(error);
		}
	}

	async getCartById(idNumber) {
		try {
			const cartById = await CartsModel.findById(idNumber).populate('products')
			return cartById;
		} catch (error) {
			console.log(error);
		}
	}

	async addProdToCart(id, product) {
		try {
			const cart = await CartsModel.findById(id);
			const productInCart = cart.products.find((p) => { 
				return p.id.toString() === product._id.toString()
			});

			if (productInCart) productInCart.quantity++;
			else
				cart.products.push({
					id: product._id,
					quantity: 1,
				});

			await cart.save();
			return cart;
		} catch (error) {
			console.log(error);
		}
	};
}