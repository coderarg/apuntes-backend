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

