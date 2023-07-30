import { Router } from 'express';
const cartRouter = Router();

import __dirname from '../utils.js'
import CartManager from '../managers/carts.manager.js';
const cartManager = new CartManager(__dirname + '/files/carts.json', __dirname + '/files/products.json')

import { isProductInJson } from '../middlewares/isProductInJson.middleware.js';
/* ------------------------------------ - ----------------------------------- */

cartRouter.get('/:cid', async(req, res) =>{
    try {
        const { cid } = req.params;
        const cartById = await cartManager.getCartById(Number(cid));
        res.json(cartById.products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

cartRouter.post('/', async(req,res)=>{
    try {
        const newCart = await cartManager.addCart();
        res.json({message: `Cart ${JSON.stringify(newCart)} added`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

cartRouter.post('/:cid/product/:pid', isProductInJson, async(req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        
        await cartManager.addProductToCart(Number(cid), Number(pid));
        res.json({message: `Product with id ${pid} added to cart ${cid}`})
    } catch (error) {
        res.status(500).json({message: message.error})
    }
})

export default cartRouter;