import { ProductsModel } from './model/products.model.js'

export default class ProductDaoMongoDB {

  async getAllProducts() {
    try {
      const response = await ProductsModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product) {
    try {
      const response = await ProductsModel.create(product);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProdById(idNumber) {
    try {
      const response = await ProductsModel.findById(idNumber);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProd(idNumber, prodUpdated) {
    try {
      await ProductsModel.updateOne({ _id : idNumber }, prodUpdated)
      return prodUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async getByCode(codetf){
    try {
      const response = await ProductsModel.find({ code: codetf });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProd(idNumber){
    try {
      const response = await ProductsModel.findByIdAndDelete(idNumber);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}