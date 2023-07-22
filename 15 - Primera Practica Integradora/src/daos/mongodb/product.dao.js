import { ProductModel } from './models/product.model.js';

export default class ProductDaoMongoDB {
    async getAll(){
        try {
            const products = await ProductModel.find({});
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(idNumber){
        try {
            const productById = await ProductModel.findById(idNumber)
            return productById;
        } catch (error) {
            console.log(error);
        }
    }
    async create(obj){
        try {
            const newProduct = await ProductModel.create(obj);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }
    async update(idNumber, obj){
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(idNumber, obj, { new: true });
            return updatedProduct;
        } catch (error) {
            console.log(error);
        }
    }
    async delete(idNumber){
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(idNumber);
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}