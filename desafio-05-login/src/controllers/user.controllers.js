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
        const user = await userDao.loginUser(req.body);
        if(user) {
            req.session.info = {
                email: user.email,
                password: user.password
            }
            res.cookie('email', user.email, {
                maxAge: 60000
            })
            res.redirect('/api/products');
        } else res.redirect('/error-login')
    } catch (error) {
        next(error);
    }
};