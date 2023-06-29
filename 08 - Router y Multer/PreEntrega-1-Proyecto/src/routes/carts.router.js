import { Router } from 'express';
const cartRouter = Router();


import CartsManager from '../managers/carts.manager.js';
const cartsManager = new CartsManager('./files/carts.json', './files/productos.json')

import { fieldsValidator } from '../middlewares/FieldsValidator.middleware.js';
import { idExist } from '../middlewares/idExist.middleware.js';

cartRouter.get('/', async(req, res) =>{
    try {
        const products = await cartsManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

cartRouter.get('/limit', async(req,res) => {
    
    try {
        const { cant } = req.query;
        const products = await cartsManager.getProducts();
        if(cant <= products.length){
            const limitedProducts = products.splice(0, Number(cant));
            console.log(limitedProducts);
            res.json(limitedProducts);
        }else{
            res.status(400).json({message: `The limit(${cant}) is highest than the products number (${products.length})`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

cartRouter.post('/', [idExist, fieldsValidator], async(req, res) => {
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