import { Router } from 'express';
const productRouter = Router();

import ProductManager from '../managers/products.manager.js';
const productManager = new ProductManager('./files/productos.json')

import { fieldsValidator } from '../middlewares/FieldsValidator.middleware.js';
import { idExist } from '../middlewares/idExist.middleware.js';

/* ------------------------------------ - ----------------------------------- */


productRouter.get('/productos', async(req, res) =>{
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/productos/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productById = await productManager.getProductsById(Number(pid));
        if(productById){
            res.json(productById);
        }else{
            res.status(404).json({message: `Product not found by id ${pid}`})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/productos/limit', async(req,res) => {
    
    try {
        const { cant } = req.query;
        const products = await productManager.getProducts();
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

productRouter.post('/productos', [idExist, fieldsValidator], async(req, res) => {
    try {
        const newProduct = req.body;
        const savedProduct = await productManager.addProduct(newProduct);

        res.json({message: `${savedProduct} saved`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

productRouter.put('/productos/:pid', idExist, async(req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const products = await productManager.updateProduct(Number(pid), updatedProduct);

        res.json({message: `Product by id ${pid} updated`})
    } catch (error) {
        res.status(500).json({message: message.error})
    }

})

productRouter.delete('/productos/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductsById(Number(id));
        if(!!product) {
            const productDeleted = await productManager.deleteProduct(Number(pid));
            res.json(`${productDeleted} deleted`)
        }else{
            res.status(404).json({message: `Trying to delete: Product by id ${pid} doesn't exist`})
        }
    } catch (error) {
        res.status(500).json({message: message.error})
    }
})

export default productRouter;