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

/* 
Profile {
    id: '89136969',
    nodeId: 'MDQ6VXNlcjg5MTM2OTY5',
    displayName: 'Lucas García',
    username: 'coderarg',
    profileUrl: 'https://github.com/coderarg',
    emails: [ { value: 'lucasgarcia.developer@gmail.com' } ],
    photos: [ { value: 'https://avatars.githubusercontent.com/u/89136969?v=4' } ],     
    provider: 'github',
    _raw: '{"login":"coderarg","id":89136969,"node_id":"MDQ6VXNlcjg5MTM2OTY5","avatar_url":"https://avatars.githubusercontent.com/u/89136969?v=4","gravatar_id":"","url":"https://api.github.com/users/coderarg","html_url":"https://github.com/coderarg","followers_url":"https://api.github.com/users/coderarg/followers","following_url":"https://api.github.com/users/coderarg/following{/other_user}","gists_url":"https://api.github.com/users/coderarg/gists{/gist_id}","starred_url":"https://api.github.com/users/coderarg/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/coderarg/subscriptions","organizations_url":"https://api.github.com/users/coderarg/orgs","repos_url":"https://api.github.com/users/coderarg/repos","events_url":"https://api.github.com/users/coderarg/events{/privacy}","received_events_url":"https://api.github.com/users/coderarg/received_events","type":"User","site_admin":false,"name":"Lucas García","company":null,"blog":"","location":"Buenos Aires, Argentina","email":"lucasgarcia.developer@gmail.com","hireable":true,"bio":"Estudiante de Informática","twitter_username":null,"public_repos":9,"public_gists":0,"followers":3,"following":5,"created_at":"2021-08-18T11:14:01Z","updated_at":"2023-08-17T22:01:15Z"}',
    _json: {
      login: 'coderarg',
      id: 89136969,
      node_id: 'MDQ6VXNlcjg5MTM2OTY5',
      avatar_url: 'https://avatars.githubusercontent.com/u/89136969?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/coderarg',
      html_url: 'https://github.com/coderarg',
      followers_url: 'https://api.github.com/users/coderarg/followers',
      following_url: 'https://api.github.com/users/coderarg/following{/other_user}',   
      gists_url: 'https://api.github.com/users/coderarg/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/coderarg/starred{/owner}{/repo}',     
      subscriptions_url: 'https://api.github.com/users/coderarg/subscriptions',        
      organizations_url: 'https://api.github.com/users/coderarg/orgs',
      repos_url: 'https://api.github.com/users/coderarg/repos',
      events_url: 'https://api.github.com/users/coderarg/events{/privacy}',
      received_events_url: 'https://api.github.com/users/coderarg/received_events',    
      type: 'User',
      site_admin: false,
      name: 'Lucas García',
      company: null,
      blog: '',
      location: 'Buenos Aires, Argentina',
      email: 'lucasgarcia.developer@gmail.com',
      hireable: true,
      bio: 'Estudiante de Informática',
      twitter_username: null,
      public_repos: 9,
      public_gists: 0,
      followers: 3,
      following: 5,
      created_at: '2021-08-18T11:14:01Z',
      updated_at: '2023-08-17T22:01:15Z'
    }
  }
   */