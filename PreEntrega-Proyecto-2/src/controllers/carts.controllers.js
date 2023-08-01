import * as cartService from '../services/carts.services.js';

export const createCartCtrl = async (req, res, next) => {
    try {
        const response = await cartService.createCart();
        res.json(response);
    } catch (error) {
        next(error);
    }
}