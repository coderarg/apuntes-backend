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

export const deleteProdCtrl = async (req, res, next) => {
    try {
        const { cid } = req.params; 
        const { pid } = req.params;
        const response = await cartService.deleteProd(cid, pid);
        res.json(response);
    } catch (error) {
        next(error)
    }
}

export const deleteCartCtrl = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await cartService.deleteCart(cid);
        res.json(response);
    } catch (error) {
        next(error)
    }
}

export const addManyProdsCtrl = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const prodArray = req.body;
        const response = await cartService.addManyProds(cid, prodArray);
        res.json(response)
    } catch (error) {
        next(error);
    }
}

export const modifyQuantityCtrl = async (req, res, next) => {
    try {
        const body = req.body;
        const { cid } = req.params;
        const { pid } = req.params;

        // body // [{ cant: 3 }]
        const response = await cartService.modifyQuantity(cid, pid, body[0].cant);
        res.json(response)

    } catch (error) {
        next();
    }
}

