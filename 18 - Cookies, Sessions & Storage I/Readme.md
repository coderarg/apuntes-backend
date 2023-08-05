# Cookies
Son archivos que podemos guardar del lado del cliente con información útil del usuario que visita el sitio web.
Son independientes de cada navegador.
Esta información se utiliza para concer las preferencias del usuario.

- Se le pueden configurar un __tiempo de vida__. Una vez transcurrido ese tiempo, se borra automáticamente.
- Al almacenar del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecauda lo que se vaya a guardar como cookie.
- Podemos asignarle clasves secretas para poder aumentar la seguridad.
- Vivien en el navegador, así que no guardamos datos sensibles.

## Instalación
Instalamos las dependencias y librería de cookie parser.

```shell
npm init -y
npm express cookie-parser
```

[+info Cookie Parser](https://www.npmjs.com/package/cookie-parser)

### Cookie Parser
Trabaja como un middleware, a nivel de aplicación.

```javascript
// Creamos un servidor, importamos cookie-parser.
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

//Vamos a utilizar este string para firmar nuestras cookies.
const mySecretKey = '1234';

//Configuramos cookieParser pasándole el secretKey
app.use(cookieParser(mySecretKey));

//Seteamos la cookie de "idioma" en "inglés"
app.get('/set-cookie', (req, res) => {
    res.cookie('idioma', 'español'
    , { maxAge: 3000 } // Este parámetro elimina automáticamente la cookie después de la cantidad de milisegundos que le pasamos
    ).send('ok')
});

//Traemos la cookie seteada en el navegador
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies)
    const { idioma } = req.cookies;
    idioma === 'ingles' ? res.send('hello!') : res.send('Hola!')
});

//Vamos a pasar otro parámetro con {signed: true}. Esto nos permite firmar la cookie con nuestra secret key.
app.get('/set-signed-cookie', (req, res) => {
    res.cookie('name', 'juan', 
    //Primero debemos pasar el objeto de signed
    { signed: true } 
    //Luego podremos pasar el objeto con maxAge
    // ,{ maxAge: 3000 }
    ).send('ok')
});

// De esta forma traemos los 2 objetos de cookies.
// cookies y signedCookies
app.get('/get-cookies', (req, res) => {
    res.json({
        cookies: req.cookies,
        signedCookies: req.signedCookies
    })
});
/* 
Esto devuelve un objeto:

    {
        "cookies":{
            "idioma": "español"
        },
        "signedCookies: {
            "name": "juan"
        }
    }
*/

// De esta manera borramos todas las cookies NO FIRMADAS.
app.get('/clear', (req, res)=> {
    const cookies = req.cookies;
    const keys = Object.keys(cookies);
    keys.forEach((key) => res.clearCookie(key));
    res.send('cookies clear')
})

app.listen(8080, ()=>{
    console.log('server ok');
});
```

### Como borrar cookies firmadas
Esta información la consulté en chat-gpt, ya que en la clase no pudimos ver la manera de eliminar cookies firmadas.  
Para ello, debemos pasarle a la función "clearCookie" el objeto { signed: true } como parámetro.

```javascript
app.get('/clear-signed', (req, res) => {
    res.clearCookie('name', { signed: true });
    res.send('Cookie firmada eliminada correctamente.');
});
```

# Sessions
Las sesiones se guardan del lado del servidor, ya que este es más seguro.

Hay 3 formas de guardar sessión:
- Memoria
- Archivo
- Base de Datos

## Instalación
```shell
    npm init -y
    npm i express express-session
```

[+ info express-session](https://www.npmjs.com/package/express-session)

En esta ocasión vamos a ver como se guarda la sessión en memoria.

## Configuramos session:

```javascript
/* Server */
import express from 'express';
import session from 'express-session';

const sessionConfig = {
    secret: 'secret', //string para firmar las cookies
    cookie: { maxAge: 10000 }, // tiempo máximo de vida en ms
    saveUninitialized: true, // crea la sessión aunque no le hayamos pasado ningún dato, la crea vacía
    resave: false // Fuerza la sessión a guardarse aunque no se haya inicializado.
};

// Generamos que la app use session
app.use(session(sessionConfig));

// Esta sería una pequeña base de datos a modo de simulación, de usuarios ya registrados.
const users = [
    {
        username: 'juan',
        password: 1234,
        admin: true
    },
    {
        username: 'jose',
        password: 1234,
        admin: false
    }
];

// Generamos el endpoint para el logueo.
app.post('/login', (req, res)=> {
    //Traemos los datos de la web cuando se genera un logueo.
    const { username, password } = req.body;
    //Buscamos el index del usuario logueado, si no lo encuntra devuelve "-1";
    const index = users.findIndex((user) => user.username === username && user.password === password);

    if(index < 0) res.json({ msg: 'Unauthorized' })
    else{ 
        //Si el indice es >= que 0, entonces seteamos en una variable de la session la informacion del usuario. Podemos darle cualquier nombre, en nuestro caso usaremos "info"
        const user = users[index];
        req.session.info = {
            loggedIn: true,
            count: 1, //Cuantas veces se ingresa
            admin: user.admin
        }
        res.json({ msg: `Bienvenido ${user.username}` })
    }
}); 

app.get('/secret-endpoint', validateLogin, (req, res) => {
    req.session.info.count++;
    res.json({
        msg: 'endpoint secreto',
        session: req.session
    })
});

app.get('/admin-secret-endpoint', validateLogin, isAdmin, (req, res) => {
    req.session.info.count++;
    res.json({
        msg: 'endpoint secreto SOLO ADMINS',
        session: req.session
    })
});


// De esta manera llamamos el método de session para destruir la sesión.
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ msg: 'session has been destroyed' })
})


/* ----------------------------------------------------- */

/* Middlewares */

// Ingresamos al req.session.info y verificamos si está logueado. Si es así, lo dejamos pasar.
const validateLogin = (req, res, next) => {
    if (req.session.info.loggedIn) next();
    else res.json({ msg: 'Unauthorized' })
};

// Acá verificamos si el usuario es admin de la misma manera que la anterior.
const isAdmin = (req, res, next) => {
    if (req.session.info.admin) next();
    else res.json({ msg: 'Unauthorized' })
};

/* ----------------------------------------------------- */

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});
```