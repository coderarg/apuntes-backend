export const register = async(req, res, next) => {
    try {
        res.render('register');
    } catch (error) {
        next(error)        
    }
}

export const errorRegister = async(req, res, next) => {
    try {
        res.render('errorRegister');
    } catch (error) {
        next(error)        
    }
}

export const login = async(req, res, next) => {
    try {
        res.render('login');
    } catch (error) {
        next(error)        
    }
}

export const errorLogin = async(req, res, next) => {
    try {
        res.render('errorLogin');
    } catch (error) {
        next(error)        
    }
}

export const profile = async(req, res, next) => {
    try {
        res.render('profile');
    } catch (error) {
        next(error)        
    }
}