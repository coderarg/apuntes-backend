import { Router } from 'express';
const cartRouter = Router();

import CartManager from '../managers/carts.manager.js';
const cartManager = new CartManager('./files/carts.json', './files/productos.json')

import { isProductInJson } from '../middlewares/isProductInJson.middleware.js';
/* ------------------------------------ - ----------------------------------- */

cartRouter.get('/cart/:cid', async(req, res) =>{
    try {
        const { cid } = req.query;
        const cartById = await cartManager.getCartById(Number(cid));
        res.json(cartById.products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

cartRouter.post('/cart/:cid/product/:pid', isProductInJson,  async(req, res) => {
    try {
        const { cid } = req.query;
        const { pid } = req.query;
        
        await cartManager.addProductToCart(Number(cid), Number(pid));
        res.json({message: `Product with id ${pid} added to cart ${cid}`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default cartRouter;