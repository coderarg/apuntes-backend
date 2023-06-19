import express from 'express';
import ProductManager from './manager/ProductManager.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./productsFile.json');

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

app.get('/limit', async(req,res) => {
    
    try {
        const { cant } = req.query;
        const products = await productManager.getProducts();
        if(cant <= products.length){
            const limitedProducts = products.splice(0, cant);
            console.log(limitedProducts);
            res.json(limitedProducts);
        }else{
            res.status(400).json({message: `The limit(${cant}) is highest than the products number (${products.length})`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res)=>{
    try{
        const { title, description, price, thumbnail, code, stock} = req.body;

        const product = { title, description, price, thumbnail, code, stock};
        const newProduct = await productManager.addProduct(product);
        
        console.log(newProduct);
        res.json({message: `${product} added`})
    }catch (error){
        res.status(500).json({error: error.message})
    }
});

app.put('/products/:idProduct', async(req, res) => {
    try {
        const { idProduct } = req.params;
        const idNumber = Number(idProduct);
        const productToUpdate = req.body;

        const productExist = await productManager.getProductById(idNumber);
        if(productExist){
            await productManager.updateProduct(idNumber, productToUpdate);
            res.json({ message: `Product id:${idNumber} updated`});
        } else {
            res.status(400).json({ message: `Product id: ${idNumber} not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Error updating product"})
    }
});

app.delete('/user/:idProduct', async(req, res)=>{
    try {
        const { idProduct } = req.params;
        const idNumber = Number(idProduct);

        const productExist = await productManager.getProductById(idNumber);
            
        if(productExist) {
            await productManager.deleteProduct(idNumber);
            res.json({message: `Product with id ${idNumber} deleted`});
        } else {
            res.status(500).json({message: `Product not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Error"});
    }
})


app.listen(8080, () =>{
    console.log("Server ok on port 8080");
})