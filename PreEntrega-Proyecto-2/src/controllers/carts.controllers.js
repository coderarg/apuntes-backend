import * as cartService from '../services/carts.services.js';

export const createCartCtrl = async (req, res, next) => {
    try {
        const response = await cartService.createCart();
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const getCartByIdCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await cartService.getCartById(id);
        res.json(response);
    } catch (error) {
        next(error);
    }
}

export const addProdToCartCtrl = async (req, res, next) => {
    try {
        const { cid } = req.params; 
        const { pid } = req.params;
        const response = await cartService.addProdToCart(cid, pid);
        res.json(response); 
    } catch (error) {
        next(error)
    }
}