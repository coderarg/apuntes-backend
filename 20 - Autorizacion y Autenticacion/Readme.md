# Autorización y Autenticación

La autorización está relacionada con el permiso que tiene el usuario para realizar cierta actividad, según el rol que tiene asignado.  
En cambio, la autenticación es corroborar cual usuario está ingresando.  

## Métodos de Autenticación
Datos biométricos: Autentica usuarios mediante huellas dactilares.  
JWT (JSON Web Tokens): Este método open source permite la transmisión segura de datos entre las distintas partes. Comúnmente se utiliza para la autorización a partir de un par de claves que contiene una clave privada y una pública.  
OAuth 2.0: Permite que, mediante una api, el usuario se autentique y acceda a los recursos del sistema que necesita.

## bcrypt
Dependencia utilizada para hashear las contraseñas.  
Es importante tener en cuenta la diferencia entre hashear y encryptar una contraseña.  
En el encryptado de contraseñas, primero tomamos el string plano de la contraseña pasada por front, la encryptamos y luego la guardamos en nuestra base de datos. Conociendo el método de encryptación que se realizó podríamos desencryptar la contraseña y conocer el string plano que se pasa desde el front.  
En el caso del hasheo esto no ocurre, una vez hasheada la contraseña no podremos deshashearla. La única forma de generar el mismo código hasheado es conociendo el string plano que el usuario pasa por front. Esto quiere decir que ni siquiera el dueño del sitio web donde el usuario hace log puede conocer la contraseña del usuario.

Vamos a aplicar bcrypt tomando como ejemplo el código de login de la clase pasada.

[+info bcrypt](https://www.npmjs.com/package/bcrypt)

## Instalar bcrypt

```shell
npm i bcrypt
```

### utils.js
En el método de "register" vamos a guardar la contraseña hasheada aplicando el método "createHash" creado en utils.

Al momento del login vamos a utilizar el método "isValidPassword" creado en utils para comparar la contraseña que viene desde el input del front (string) y la contraseña guardad en nuestra base de datos (hasheada). En este mismo orden deberemos pasar las mismas al método. Primero la contraseña que viene del front, en String, y luego la hasheada que traemos de la base de datos.


```javascript
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

//Se realiza el hasheo de la password con el string "salt" que le pasamos. Transforma una contraseña(string) en un string de diferentes carácteres.

//genSaltSync recibe como parámetro el número de rounds que realiza para encryptar la contraseña
export const createHash = password => hashSync(password, genSaltSync(10));

//compareSync compara la contraseña guardada en nuestra base de datos y la que nos pasa el front. Esto devuelve true or false al comparar si la contraseña es válida.
export const isValidPassword = (password, user) => compareSync(password, user.password);
```

### user.dao.js

```javascript
async registerUser(user) {
    try {
        const { email, password } = user;
        const existUser = await UserModel.findOne({ email });
        console.log('existUser::', existUser);
        if(!existUser) {
            if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                return await UserModel.create({
                    ...user, 
                    password: createHash(password),
                    role: 'admin'
                });
            }
            return await UserModel.create({
                ...user,
                password: createHash(password)
            });
        } else return false;
    } catch (error) {
        console.log(error);
    }
}; 

async loginUser(user) {
    try {
        const { email, password } = user;
        const userExist = await UserModel.findOne({ email });
        if(userExist) {
            const passValid = isValidPassword(password, userExist);
            if(!passValid) return false;
            else return userExist;
            // !passValid ? false : userExist
        }
        else return false;
    } catch (error) {
        console.log(error);
    }
};
```

## Estrategia de autenticación: Passport
Paassport es un generador de estrategias de autenticación y autorización, para mantener un código limpio, estructurado y altamente configurable.  
Podemos utilizar y configurar múltiples estrategias de autenticación y autorización con passport. En esta ocasión crearemos una estrategia local.

[+info Passport](https://www.passportjs.org/)
[+info Passport Strategies](https://www.passportjs.org/packages/)


## Passport Local
Este funciona como un middleware, ya que se ejecuta antes que se resuelva la función.

[+info passport-local](https://www.passportjs.org/packages/passport-local/)

### Instalamos passport y passport-local
```shell
npm i passport passport-local
```
Creamos una carpeta llamada "passport" y dentro guardaremos la estrategia.

### local-strategy.js
Siempre vamos a necesitar 2 funciónes principales.  Una para serializar y otra para deserializar al usuario.

> done(a, b) recibe 2 parámetros.
>- a El error.
>- b El resultado de la búsqueda que hagamos o valor que retornemos.


```javascript
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserDao from '../daos/user.dao.js';
const userDao = new UserDao();

// usernameField y passwordField son los nombres de los campos que asignamos en el user.model y los datos que pasaremos como parámetro en la lógica de registro e inició de sesión.  
//passReqToCallback sirve para recibir la request del usuario.
const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

/* ----------------------------- lógica registro ---------------------------- */
const register = async(req, email, password, done) => {
    try {
        // const { first_name, last_name,... } = req.body
        const user = await userDao.getByEmail(email);
        //Si el user existe, retornamos un done
        if (user) return done(null, false);
        //done puede recibir 2 parámetros.
        //1. Posible error
        //2. Si se registra un usuario bien paso el (user). Si el usuario ya existe, paso (false);
        //Cuando se ejecuta done, se le pasa la información a "serialize".
        else{
            const newUser = await userDao.register(req.body);
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error);
    }
};


/* ------------------------------ lógica login ------------------------------ */
const login = async(req, email, password, done) => {
    try {
        const user = { email, password };
        console.log('USER', user);
        const userLogin = await userDao.login(user);
        console.log('LOGIN', userLogin);
        if(!userLogin) return done(null, false, { message: 'User not found' });
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
};

/* ------------------------------- strategies ------------------------------- */
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

/* ----------------------------- inicializacion ----------------------------- */
passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

/* ------------------------- serialize y deserialize ------------------------ */
//guarda al usuario en req.session.passport
//req.session.passport.user --> id del usuario
passport.serializeUser((user, done)=>{
    done(null, user._id)
});


passport.deserializeUser(async(id, done)=> {
    const user = await userDao.getById(id);
    return done(null, user);
});
```


### server.js
Inicializamos passport a nivel de aplicación como middleware para todas las rutas. ¡¡¡¡ANTES DE LAS RUTAS!!!!

```javascript
import passport from 'passport';
import './passport/local-strategy.js';

//!  --> ANTES DE LAS RUTAS <--
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use('/users', usersRouter);

```

### users.controllers.js
En los controllers solo necesito tener las respuestas.
```javascript
import UserDao from "../daos/user.dao.js"
const userDao = new UserDao();

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
        const user = await userDao.getById(req.session.passport.user);
        res.json({
        msg: 'Login ok',
        user
        })
    } catch (error) {
        next(error.message)
    }
}  
```

### users.router.js
El método authenticate inicializa la estrategia
```javascript
import { Router } from 'express'
import { registerResponse, loginResponse } from '../controllers/user.controller.js';
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';

const router = Router()

router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login', passport.authenticate('login'), loginResponse);

router.get('/private', isAuth, (req, res) => res.send('route private'));


export default router
```

