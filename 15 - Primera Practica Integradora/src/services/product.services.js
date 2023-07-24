import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
    try {
        const response = await productDao.getAll();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (idNumber) => {
    try {
        const item = await productDao.getById(idNumber);

        if(!item) return false;
        else return item;

    } catch (error) {
        console.log(error);
    }
}

export const create = async (obj) => {
    try {
        const newItem = await productDao.create(obj);
        if(!newItem) return false;
        else return newItem;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (idNumber, obj) => {
    try {
        const updatedItem = await productDao.update(idNumber, obj);
        return updatedItem;
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (idNumber) => {
    try {
        const deletedItem = await productDao.delete(idNumber);
        return deletedItem;
    } catch (error) {
        console.log(error);
    }
}