import CartsDaoMongoDB from '../daos/mongodb/carts.dao.js';
import ProductsDaoMongoDB from '../daos/mongodb/products.dao.js';

const cartsDao = new CartsDaoMongoDB();
const productsDao = new ProductsDaoMongoDB();

export const createCart = async () => {
	try {
		const response = await cartsDao.createCart();
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const getCartById = async (idNumber) => {
	try {
		const response = await cartsDao.getCartById(idNumber);
		if (!response) throw new Error('Cart does not exist')
		else return response;
	} catch (error) {
		console.log(error);
	}
}

export const addProdToCart = async (cid, pid) => {
	try {
		const cart = await cartsDao.getCartById(cid);
		const product = await productsDao.getProdById(pid);
		const response = await cartsDao.addProdToCart(cid, product);
		if (!cart) throw new Error('Cart does not exist');
		else {
			if (!product) throw new Error('Product does not exist')
			else {
				return response;
			}
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteProd = async (cid, pid) => {
	try {
		const cart = await cartsDao.getCartById(cid);
		const product = await productsDao.getProdById(pid);
		const response = await cartsDao.deleteProd(cid, product);
		if (!cart) throw new Error('Cart does not exist');
		else {
			if (!product) throw new Error('Product does not exist')
			else {
				return response;
			}
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteCart = async (cid) => {
	try {
		const cart = await cartsDao.getCartById(cid);
		const response = await cartsDao.deleteCart(cid);
		if (!cart) throw new Error('Cart does not exist');
		else return response;
	} catch (error) {
		console.log(error);
	}
}