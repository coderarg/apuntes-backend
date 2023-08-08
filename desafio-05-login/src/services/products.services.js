import ProductsDaoMongoDB from "../daos/products.dao.js";
const productDao = new ProductsDaoMongoDB();
import fs from 'fs';
import { __dirname } from "../utils.js";

export const readFile = async () => {
    try {
        const productsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));
        const newProducts = await productDao.createProduct(productsFile);
        if(!newProducts) return false;
        else return { message: 'Successful uploading products' }
    } catch (error) {
        console.log(error);   
    }
}

export const getAllProducts = async (page, limit, sortOrd, category, status) => {
    try {
        const response = await productDao.getAllProducts(page, limit, sortOrd, category, status);
        if(!response) return false;
        else return response;
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

export const getProdById = async (idNumber) => {
    try {
        const response = await productDao.getProdById(idNumber);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateProd = async (idNumber, updatedProd) => {
    try {
        //Verificar que code no se repita(si se repite lanzar error)
        const item = await productDao.getProdById(idNumber);
        if(!item) throw new Error('Product not found')
        const response = await productDao.updateProd(idNumber, updatedProd)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getByCode = async (codetf) => {
    try {
        const item = await productDao.getByCode(codetf);
        if(!item) throw new Error('Product not found by code')
        return item;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProd = async (idNumber) => {
    try {
        const deletedProd = await productDao.deleteProd(idNumber);
        return deletedProd;
    } catch (error) {
        console.log(error);
    }
}