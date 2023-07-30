import __dirname from '../utils.js'
import CartManager from '../managers/carts.manager.js';
const cartManager = new CartManager(__dirname + '/files/carts.json', __dirname + '/files/products.json')

export const isProductInJson = async(req, res, next) => {
    try {
        const { pid } = req.params;
        const products = await cartManager.getProducts();
        const isProdInJson = products.some(p => p.id === Number(pid));
        
        if(isProdInJson) {next()}
        else {res.status(404).send({message: `Product does not exist`});}
    } catch (error) {
        res.status(500).json({message: message.error});
    }
    
}