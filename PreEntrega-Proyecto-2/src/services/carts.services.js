import CartsDaoMongoDB from '../daos/mongodb/carts.dao.js';

const cartsDao = new CartsDaoMongoDB();

export const createCart = async () => {
    try {
        const response = await cartsDao.createCart();
        return response;
    }catch (error){
        console.log(error);
    }
}