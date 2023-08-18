import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.829f1f2faa04145e',
    clientSecret: '91396a4411d73cb8ed5c926e951c030597562e46',
    callbackURL: 'http://localhost:8080/api/products',
};

const loginGitHub = async (accessToken, refreshToken, profile, done) => {
    try {
        const uEmail = profile._json.email;
        const fullName = profile._json.name;
        
        const userExist = await userDao.getByEmail(uEmail);
        if(!userExist){
            const newUser = {
                full_name: fullName,
                email: uEmail,
                password: '',
                isGithub: true
            }
            //le paso una password que luego se podrá cambiar.
            const registerUser = await userDao.registerUser(newUser);
            return done(null, registerUser);
        }else{
            return done(null, userExist);
        }
    } catch (error) {
        console.log(error);
    }

}

passport.use('github', new GithubStrategy(strategyOptions, loginGitHub));