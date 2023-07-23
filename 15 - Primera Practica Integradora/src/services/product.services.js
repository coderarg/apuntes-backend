import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();

export const getAllService = async () => {
    try {
        const response = await productDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getByIdService = async (idNumber) => {
    try {
        const item = await productDao.getById(idNumber);

        if(!item) return false;
        else return item;

    } catch (error) {
        console.log(error);
    }
}

export const createService = async (obj) => {
    try {
        const newItem = await productDao.create(obj);
        if(!newItem) return false;
        else return newItem;
    } catch (error) {
        console.log(error);
    }
}

export const updateService = async (idNumber, obj) => {
    try {
        const updatedItem = await productDao.update(idNumber, obj);
        return updatedItem;
    } catch (error) {
        console.log(error);
    }
}

export const deleteService = async (idNumber|) => {
    try {
        const deletedItem = await productDao.delete(idNumber)
        return deletedItem;
    } catch (error) {
        console.log(error);
    }
}