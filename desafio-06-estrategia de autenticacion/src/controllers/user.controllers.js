import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();

export const registerUser = async(req, res, next) => {
    try {
        const newUser = await userDao.registerUser(req.body);
        console.log(req.body)
        if(newUser) res.redirect('/');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req, res, next) => {
    try {
        const foundUser = req.session.passport.user;
        console.log(foundUser);
        if(foundUser) {
            const user = {
                email: foundUser.email,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                age: foundUser.age
            }
            req.session.user = user;
            res.redirect('/api/products');
        } else res.redirect('/error-login')
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) =>{
    try {
        req.session.destroy((error) => {
            if(!error) res.render('login')
            else res.json({ message: error})
        })
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}