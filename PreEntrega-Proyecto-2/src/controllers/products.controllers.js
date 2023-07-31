import * as prodService from '../services/products.services.js';

export const readFileCtrl = async (req, res, next) => {
  try {
    const newProducts = await prodService.readFile();
    if (!newProducts) throw new Error("File Error!")
    else res.json("Successful file reading")
  } catch (error) {
    next(error);
  }
}

export const getAllProductsCtrl = async (req, res, next) => {
  try {
    const allProducts = await prodService.getAllProducts();
    if (!allProducts) throw new Error('Products not found');
    else res.json(allProducts);
  } catch (error) {
    next(error);
  }
}

export const createProductCtrl = async (req, res, next) => {
  try {
    const { product } = { ...req.body };
    const newProduct = await prodService.createProduct(product);
    if (!newProduct) throw new Error('Error creating product');
    else res.json(newProduct);
  } catch (error) {
    next(error);
  }
}