import ProductDaoMongoDB from "../daos/mongodb/products.dao.js";
const productDao = new ProductDaoMongoDB();
import fs from 'fs';
import { __dirname } from "../utils.js";

export const readFile = async () => {
    try {
        const productsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));
        const newProducts = await productDao.createProduct(productsFile);
        console.log(newProducts);
        if(!newProducts) return false;
        else return { message: 'Successful uploading products' }
    } catch (error) {
        console.log(error);   
    }
}

export const getAllProducts = async () => {
    try {
        const response = await productDao.getAllProducts();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (product) => {
    try {
        const response = await productDao.createProduct(product);
        return response;
    } catch (error) {
        console.log(error);
    }
}