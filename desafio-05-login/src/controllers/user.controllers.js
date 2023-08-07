import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const registerUser = async(req, res, next) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        if(newUser) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.loginUser(req.body);
        if(user) {
            req.session.email = email;
            req.session.password = password;
            res.redirect('/profile');
        } else res.redirect('/error-login')
    } catch (error) {
        next(error);
    }
};