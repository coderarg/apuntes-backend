# Cookies, Session & Storage II

## Memory Storage.
En la clase anterior vimos como guardar información de session y cookies en memoria de navegador.
A diferencia del guardado en archivos o base de datos,  la persistencia en memoria es un almacenamiento muy peligroso, ya que si el servidor se apa o reinicia, la sesión se pierde y no habrá forma de recuperarla.

## File Store
La persistencia de datos de session en archivos, esto soluciona el problema del uso de Memory Storage.  
Vamos a realizar una api que guarde los datos de session en un archivo.

### Instalamos dependencias.
- Express
- Express-Session
- Cookie-Parser
- Session-File-Store
```shell
npm init -y
npm i express express-session cookie-parser session-file-store
```

### server.js
```javascript
// Importamos las dependencias
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import userRouter from './routes/user.router.js';

// Creamos una constante donde guardaremos el objeto sessionFileStore y a este le pasamos por parámetro la dependencia de "session" importada. 
const FileStore = sessionFileStore(session);

// Creamos un objeto para las opciones de la sesión.
const fileStoreOptions = {
    //Instanciamos FileStore, esto nos indica donde vamos a guardar las sesiones.
    store: new FileStore({
        path: './sessions', //Donde se guarda
        ttl: 60, //Tiempo de vida en segundos
        reapInterval: 30 //Intervalo de tiempo que pasa cada vez que verifica y borra las sessiones muertas en nuestro directorio.
    }),
    secret: '1234', // String secreto
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 //Esto debe durar igual o más que la session, ya que la vamos a utilizar para que el cliente nos envíe el id de sessión y verificar que esté activa. 
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hacemos el app.use del cookieParser
app.use(cookieParser());
// Hacemos el app.use del session y le pasamos por parámetro el objeto de opciones de sessiones.
app.use(session(fileStoreOptions));

app.use('/api', userRouter);

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});
```

### users.controller.js

```javascript
// Creamos una pequeña base de datos de usuarios
const users = [
    {
      username: 'juan',
      password : '1234',
      admin: true,
    },
    {
      username: 'jose',
      password : '1234',
      admin: false,
    }
];

//Este controlador es igual al de la clase pasada para realizar el login
export const login = (req, res) => {
    const { username, password } = req.body;
    const index = users.findIndex((user) => user.username === username && user.password === password);
    if(index < 0) res.json({ msg: 'Unauthorized' });
    else{ 
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            count: 1,
            username: user.username,
            admin: user.admin
        }
        res.json({ msg: `Bienvenido ${user.username}` })
    }
}

// Este controlador cuenta las visitas de cada usuario, agregando 1 al count de cada usuario.
export const visit = (req, res) => {
    req.session.info.count++;
    res.json({
        msg: `${req.session.info.username} visitó el sitio ${req.session.info.count} veces`
    })
};

// Este controlador destruye la sessión una vez que se verifica que se cerró sesión.
export const logout = (req, res) => {
    // pasamos por parámetro error al metodo destroy.
    req.session.destroy((err) => {
        // Si no hay error la sessión se cierra correctamente
        if(!err) res.json({ msg: 'Logout ok!' });
        // Caso contrario, devuelve un error.
        else res.json({ msg: err });
    })
};

// Controlador para ver la info de la sesión.
export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies
    });
};
```

### validateLogin.js (middleware)
Se valida que el usuario tenga acceso y pueda iniciar sesión
```javascript
export const validateLogin = (req, res, next) => {
    if(req.session.info && req.session.info.loggedIn) next();
    else res.status(401).json({ msg: 'No Autorizado!' });
};
```

###  users.router.js
Importamos router de express, los controladorores, el middleware, y creamos las rutas para cada controlador.

```javascript
import { Router } from "express";
const router = Router();
import { login, logout, visit, infoSession } from '../controllers/user.controller.js';
import { validateLogin } from "../middlewares/validateLogin.js";

router.post('/login', login);
router.get('/info', validateLogin, infoSession);
router.get('/secret-endpoint', validateLogin, visit);
router.post('/logout', logout);

export default router;
```

## DataBase Store
Vamos a utilizar la base de datos de MongoDB para la permanencia de datos de las sesiones.

### Instalamos dependencias
Instalamos:
- express
- express-session
- cookie-parser
- mongoose
- connect-mongo

```shell
npm init -y
npm i express espress-session mongoose connect-mongo  cookie-parser

```

### ./db/dbConnection.js
Creamos la conexión a la base de datos de mongo.

```javascript
import { connect } from 'mongoose';

export const connectionString = 'mongodb://127.0.0.1:27017/coderhouse';

try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB!');
} catch (error) {
    console.log(error);
}
```

### server.js

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//Importamos MongoStore de connect-mongo.
import MongoStore from 'connect-mongo';
import userRouter from './routes/user.router.js';
import './db/dbConnection.js';
import { connectionString } from './db/dbConnection.js';

// Generamos las opciones de guardado de sessiones.
const mongoStoreOptions = {
    store: MongoStore.create({
        //Pasamos el string de conexión de la db
        mongoUrl: connectionString,
        //Con crypto podemos encryptar los datos de sesión.
        // crypto: {
        //     secret: '1234'
        // }
    }),
    // Las siguientes opciones son iguales para file, ya que son las opcines de cookies.
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// Pasamos el mongoStoreOptines por session.
app.use(session(mongoStoreOptions));

app.use('/api', userRouter);

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});
```