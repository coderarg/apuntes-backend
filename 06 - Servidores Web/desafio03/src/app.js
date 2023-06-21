import express from 'express';
import ProductManager from './manager/ProductManager.js'
const app = express();

const productManager = new ProductManager('./products.json');

/* ------------------------------------ - ----------------------------------- */

app.get('/products', async(req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.get('/products/:idProduct', async(req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await productManager.getProductById(Number(idProduct));

        if(product){
            res.json(product);
        }else{
            res.status(404).json({message: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.post('/products', async(req, res)=>{
    try{
        const { title, description, price, thumbnail, code, stock} = req.body;
        const product = { title, description, price, thumbnail, code, stock};
        const newProduct = await productManager.addProduct(product);
        
        res.json(newProduct)
    }catch (error){
        res.status(500).json({error: error.message})
    }
});

app.put('/products/:idProduct', async(req, res) => {
    try {
        const { idProduct } = req.params;
        const productUpdated = req.body;
        const product = await productManager.updateProduct(idProduct, productUpdated);
        res.status(200).json({message: `Producto id:${idProduct} updated`});
    } catch (error) {
        res.status(500).json({message: "Error updating product"})
    }
});

app.listen(8080, () =>{
    console.log("Server ok on port 8080");
})