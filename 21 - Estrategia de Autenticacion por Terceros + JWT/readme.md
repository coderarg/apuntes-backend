### Middleware de Autenticación
Este se puede poner en cualquier ruta para verificar si el usuario está autenticado con passport. Retorna true or false.

```javascript
export const isAuth = (req,res,next) => {
    console.log(req.session.passport.user);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()) return next();
    res.status(401).send({ msg: 'Unauthorized' })
}
```

# Estrategia de Autenticación con Terceros + JWT

## Autenticación con GitHub

Ingresamos en nuestra cuenta de GitHub.  
Ingresamos en "Settings".  
![Alt text](image.png)  
Debajo de todo se encuentra "Developer Settings".  
Clickeamos en el bottón de "New GitHub App".
![Alt text](image-1.png)  

En esta interfaz vamos a configurar la app de github.
![Alt text](image-2.png)  

- Homepage URL: url de la homepage
- Callback URL: url a la que se redirige luego de autenticarse.
- Expire user authorization tokens (false);
- Request user authorization (OAuth) during installation (false).
- Enable Device Flow (false)

- Webhoook(false)

Permissions:
Nosotros vamos a solicitarle permiso sobre información al cliente.

Vamos a necesitar email e información de perfil.


Clickeamos en "Create GitHub App". Esto crea la app y nos llega a otra pantalla con información acerca de la app que creamos.

Luego damos en "Generate a new client secret" y esto nos da un secret key para cargarla en el sitio web.

## Github Strategy

### Instalamos passport-github2

```shell
npm i passport passport-github2
```

Creamos un nuevo archivo dentro de la carpeta "passport" llamado github-strategy.js para configurar la autenticación con github.


### github-strategy.js

```javascript
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/user.dao.js';
const userDao = new UserDao();

const strategyOptions = {
    clientID: 'Iv1.3c4696932577965e',
    clientSecret: '24d21d0a9d0c6c15880a55cc0ba3a6be18246129',
    callbackURL: 'http://localhost:8080/users/profile-github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    // console.log('PROFILE --> ', profile);
    const email = profile._json.email !== null ? profile._json.email : profile_json.blog;
    const user = await userDao.getByEmail( email );
    if ( user ) return done( null, user );
    const newUser = await userDao.register({
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1],
        email,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

//Inicializamos la estrategia de github.
passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
```

### users.router.js
Creamos las rutas de autenticación con GitHub.

```javascript
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse);

```