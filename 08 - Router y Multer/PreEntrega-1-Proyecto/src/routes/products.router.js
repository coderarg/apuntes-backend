import { Router } from 'express';
const productRouter = Router();

import __dirname from '../utils.js'
import ProductManager from '../managers/products.manager.js';
const productManager = new ProductManager(__dirname + '/files/products.json')

import { fieldsValidator } from '../middlewares/FieldsValidator.middleware.js';
import { idExist } from '../middlewares/idExist.middleware.js';

/* ------------------------------------ - ----------------------------------- */


productRouter.get('/', async(req, res) =>{
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/:pid', async(req, res) => {
    try {
        const { pid } = req.params;
        const productById = await productManager.getProductById(Number(pid));
        if(productById){
            res.json(productById);
        }else{
            res.status(404).json({message: `Product not found by id ${pid}`})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

productRouter.get('/product/limit', async(req,res) => {
    try {
        const { cant } = req.query;
        console.log(cant);
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

productRouter.post('/', [idExist, fieldsValidator], async(req, res) => {
    try {
        const newProduct = req.body;
        const savedProduct = await productManager.addProduct(newProduct);

        res.json({message: `${JSON.stringify(savedProduct)} saved`})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

productRouter.put('/:pid', idExist, async(req, res) => {
    try {
        const { pid } = req.params;
        const newProduct = req.body;
        const updated = await productManager.updateProduct(Number(pid), newProduct);
        res.json({message: `Product updated:  ${updated}`})
    } catch (error) {
        res.status(500).json({message: message.error})
    }

})

productRouter.delete('/:pid', idExist, async(req, res) => {
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