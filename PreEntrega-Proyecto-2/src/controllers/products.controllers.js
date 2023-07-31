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
    const product = req.body;
    const newProduct = await prodService.createProduct(product);
    if (!newProduct) throw new Error('Error creating product');
    else res.json(newProduct);
  } catch (error) {
    next(error);
  }
}

export const getProdByIdCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodById = await prodService.getProdById(id);
    if(!prodById) throw new Error('Error getting product by id')
    else res.json(prodById)
  } catch (error) {
    next(error);
  }
}

export const updateProdCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodToUpdate = prodService.getProdById(id);
    //Verificar que code no se repita(si se repite lanzar error)
    if(!prodToUpdate) throw new Error('Product not found')
    else {
      const updatedProd = req.body;
      if(!!updatedProd.code){
        const codeExist = await prodService.getByCode(updatedProd.code);
        if(!!codeExist){
          const update = await prodService.updateProd(id, updatedProd);
          res.json(update);
        }else{
          throw new Error('Code already exist!');
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

export const getByCodeCtrl = async (req, res, next) => {
  try {
    const { codetf } = req.params;
    const getByCode = await prodService.getByCode(codetf);
    if(!getByCode) throw new Error('Error getting product by code');
    else res.json(getByCode);
  } catch (error) {
    next(error);
  }
}

export const deleteProdCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    await prodService.deleteProd(id);
    res.json({msg: 'Product deleted'});
  } catch (error) {
    next(error);
  }
}