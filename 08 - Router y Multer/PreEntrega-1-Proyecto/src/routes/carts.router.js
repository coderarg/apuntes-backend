import { Router } from 'express';
const cartRouter = Router();

import CartsManager from '../managers/carts.manager.js';
const cartsManager = new CartsManager('./files/carts.json', './files/productos.json')

/* ------------------------------------ - ----------------------------------- */


cartRouter.get('/', async(req, res) =>{
    try {
        const products = await cartsManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

cartRouter.post('/', async(req, res) => {
    try {
        const newProduct = req.body;
        const savedProduct = await cartsManager.addProduct(newProduct);

        res.json({message: `${savedProduct} saved`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

cartRouter.put('/:pid', idExist, async(req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const products = await cartsManager.updateProduct(Number(pid), updatedProduct);

        res.json({message: `Product by id ${pid} updated`})
    } catch (error) {
        res.status(500).json({message: message.error})
    }

})

cartRouter.delete('/pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await cartsManager.getProductsById(Number(id));
        if(!!product) {
            const productDeleted = await cartsManager.deleteProduct(Number(pid));
            res.json(`${productDeleted} deleted`)
        }else{
            res.status(404).json({message: `Trying to delete: Product by id ${pid} doesn't exist`})
        }
    } catch (error) {
        res.status(500).json({message: message.error})
    }
})

export default productsRouter;