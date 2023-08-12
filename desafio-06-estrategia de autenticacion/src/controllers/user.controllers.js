import * as userServices from '../services/users.services.js'

export const registerUser = async(req, res, next) => {
    try {
        const newUser = await userServices.registerUser(req.body);
        if(newUser) res.redirect('/');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req, res, next) => {
    try {
        const foundUser = await userServices.loginUser(req.body);
        
        if(foundUser) {

            const user = {
                email: foundUser.email,
                first_name: foundUser.first_name,
                last_name: foundUser.last_name,
                age: foundUser.age
            }
            req.session.user = user;
            res.redirect('/products');
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

export const registerResponse = (req, res, next)=>{
    try {
        res.json({
            msg: 'Register ok',
            session: req.session 
        });
    } catch (error) {
        next(error.message)
    }
}  

export const loginResponse = async(req, res, next)=>{
    try {
        
        const user = await userServices.getById(req.session.passport.user);
        res.json({
            msg: 'Login ok',
            user
        })
    } catch (error) {
        next(error.message)
    }
}