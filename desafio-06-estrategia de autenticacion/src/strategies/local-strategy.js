import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport';
import * as userServices from '../services/users.services.js';
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

const register = async(req, email, password, done)=>{
    try {
        const user = await userServices.getByEmail(email);
        if(user) return done(null, false);
        else{
            const newUser = await userServices.register(req.body);
            return done(null, newUser)
        }
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, email, password, done) =>{
    try {
        const user = { email, password };
        const userLogin = await UserDao.login(user);
        if(!userLogin) return done(null, false, {message: 'User not found'})
        else return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
}

const loginStrategy = new LocalStrategy(loginStrategy, login);
const registerStrategy = new LocalStrategy(strategyOptions, register);

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async(id, done) => {
    const user = await UserDao.getById(id);
    return done(null, user);
})