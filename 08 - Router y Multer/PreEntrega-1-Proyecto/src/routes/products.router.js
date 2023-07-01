import { Router } from 'express';
const productRouter = Router();

import ProductsManager from '../managers/products.manager.js';
const productsManager = new ProductsManager('./files/productos.json')

import { fieldsValidator } from '../middlewares/FieldsValidator.middleware.js';
import { idExist } from '../middlewares/idExist.middleware.js';

/* ------------------------------------ - ----------------------------------- */


productRouter.get('/', async(req, res) =>{
    try {
        const products = await productsManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productById = await productsManager.getProductsById(Number(pid));
        if(productById){
            res.json(productById);
        }else{
            res.status(404).json({message: `Product not found by id ${pid}`})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/limit', async(req,res) => {
    
    try {
        const { cant } = req.query;
        const products = await productsManager.getProducts();
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

productRouter.post('/', [idExist, fieldsValidator], async(req, res) => {
    try {
        const newProduct = req.body;
        const savedProduct = await productsManager.addProduct(newProduct);

        res.json({message: `${savedProduct} saved`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

productRouter.put('/:pid', idExist, async(req, res) => {
    try {
        const { pid } = req.params;
        const updatedProduct = req.body;
        const products = await productsManager.updateProduct(Number(pid), updatedProduct);

        res.json({message: `Product by id ${pid} updated`})
    } catch (error) {
        res.status(500).json({message: message.error})
    }

})

productRouter.delete('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsManager.getProductsById(Number(id));
        if(!!product) {
            const productDeleted = await productsManager.deleteProduct(Number(pid));
            res.json(`${productDeleted} deleted`)
        }else{
            res.status(404).json({message: `Trying to delete: Product by id ${pid} doesn't exist`})
        }
    } catch (error) {
        res.status(500).json({message: message.error})
    }
})

export default productRouter;