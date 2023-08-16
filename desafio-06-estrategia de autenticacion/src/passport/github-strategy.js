import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.829f1f2faa04145e',
    clientSecret: '91396a4411d73cb8ed5c926e951c030597562e46',
    callbackURL: 'http://localhost:8080/api/products',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    ('PROFILE --> ', profile);
    const email = profile._json.email !== null ? profile._json.email : profile_json.blog;
    const user = await userDao.getByEmail( email );
    
    if ( user ) return done( null, user );
    const fullName = profile._json.name;
    const parts = fullName.split(' '); 
    let lastName = '';
    parts.length > 1 ? lastName = parts.slice(1).join(' ') : lastName = parts[0]; 
    const newUser = await userDao.register({
        first_name: profile._json.name.split(' ')[0],
        last_name: lastName,
        email,
        password: '',
        isGithub: true,
        image: profile._json.avatar_url
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));