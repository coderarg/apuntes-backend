import { ProductsModel } from './model/products.model.js';

export default class ProductDaoMongoDB {

    async getAllProducts() {
        try {
            const response = await ProductsModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createProduct(product){
        try {
            const response = await ProductsModel.create(product);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}