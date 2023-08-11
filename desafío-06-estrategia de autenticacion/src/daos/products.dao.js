import { ProductsModel } from './models/products.model.js'

export default class ProductsDaoMongoDB {

  async getAllProducts(page=1, limit=10, sort, category = undefined, status = undefined) {
    try {
      const filter = {};
      if(!!category) filter.category = category;
      if(!!status) filter.status = status;
      if(status === 'true') filter.stock = {$gt: 0};
      
      const sortOrder = {};
      if(!!sort){
        if(sort === 'asc') sortOrder.price = 1;
        if(sort === 'desc') sortOrder.price = -1;
      }

      const response = await ProductsModel.paginate(filter, {
        page, 
        limit,
        sort: sortOrder
      });
      return(response);
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