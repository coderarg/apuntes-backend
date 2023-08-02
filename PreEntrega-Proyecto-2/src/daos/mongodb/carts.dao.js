import { CartsModel } from './model/carts.model.js';
import { ProductsModel } from './model/products.model.js';

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
			const cartById = await CartsModel.findById(idNumber).populate('products.id')
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

	async deleteProd(id, product){
		try {
			const cart = await CartsModel.findById(id);
			const productInCart = cart.products.find((p) => { 
				return p.id.toString() === product._id.toString()
			});

			if(!productInCart) throw new Error('Product does not exist into the cart')
			else{
				if (productInCart.quantity > 1) productInCart.quantity--;
				else{
					const pIndex = cart.products.findIndex((p) => { 
						return p.id.toString() === product._id.toString()
					});
					cart.products.splice(pIndex, 1);
				}	
			}
			await cart.save();
			return cart;
		} catch (error) {
			console.log(error);
		}
	}

	async deleteCart(cid){
		try {
			const cart = await CartsModel.findById(cid);
			cart.products.length = 0;
			await cart.save();
			return cart;
		} catch (error) {
			console.log(error);
		}
	}

	async addManyProds(cid, prodArray){
		try {
			const cart = await CartsModel.findById(cid);
			const newProdArray = [];
			for (let i = 0; i < prodArray.length; i++) {
				const prod = prodArray[i];
				const prodbycode = await ProductsModel.find({code: prod.code});
				newProdArray.push(prodbycode);
			}

			newProdArray.forEach((p)=>{
				const prodExist = cart.products.find((item) => {
					return item.id.toString() === p[0]._id.toString(); 
				})

				console.log(!prodExist);

				if (!prodExist) {
					cart.products.push({
						id: p[0]._id,
						quantity: 1,
					});
				}
				else prodExist.quantity++;
			})
			await cart.save();
			return cart;
		} catch (error) {
			console.log(error);
		}
	}
}