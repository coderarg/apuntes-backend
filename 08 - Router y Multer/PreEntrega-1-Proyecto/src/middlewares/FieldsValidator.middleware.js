import __dirname from "../utils.js";
import ProductManager from "../managers/products.manager.js";
const productManager = new ProductManager(__dirname + '/files/products.json');

export const fieldsValidator = async (req, res, next) => {
    try {
        const products = await productManager.getProducts();
        const newProduct = req.body;
    
        let isAllFields = (!!newProduct.title && !!newProduct.description && !!newProduct.code && !!newProduct.price && !!newProduct.stock && !!newProduct.category);

        if (!isAllFields) {
            res.status(500).send("All fields are requiered");
            return;
        }
    
        let isCodeExist = products.some((element) => {
            return element.code === newProduct.code;
        });
        if (isCodeExist) {
            res.status(500).send("Error: Product code already exist");
            return;
        }
    
        if(newProduct.status){
            if(newProduct.status === false){
                res.status(401).send("Status must be 'true' by default")
            }
        }
        
        if (isAllFields && !isCodeExist){
            next()
        }
        
    } catch (error) {
        res.status(500).send(`fieldsValidator: All fields are required.`)
    }

}