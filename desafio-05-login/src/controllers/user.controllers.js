import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const registerUser = async(req, res, next) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        if(newUser) res.redirect('/');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req, res, next) => {
    try {
        const foundUser = await userDao.loginUser(req.body);
        
        if(foundUser) {
            //No se le puede pasar un atributo de un objeto.
            //req.session.user.email = foundUser.email;

            //Primero creo el objeto user con los datos que necesito y luego lo paso por session.
            const user = {email: foundUser.email}
            req.session.user = user;
            res.redirect('/api/products');
        } else res.redirect('/error-login')
    } catch (error) {
        next(error);
    }
};