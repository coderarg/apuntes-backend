# Router

## Router
Paso a paso de como realizar rutas con administrador de archivos con express.

> Debemos tener en consideración que nuestro archivo package.json tenga la configuración "type":"module" para importar los métodos de node necesarios.
___

### manager.js
Dentro del archivo manager.js importamos file system y exportamos la clase que administra los archivos a través del path que le pasemos por constructor.

```javascript
import fs from 'fs';
export default class ProductManager{
    constructor(path) {
        this.path = path;
    }
}
```
___

### router.js
Dentro del router importamos { Router } de express y lo guardamos en una constante.
Importamos el archivo de manager.js y generamos el objeto a través de la case y le pasamos el 'path.json' donde guardaremos los archivos.
Luego programamos las acciones que realizará cada ruta y exportamos el router para utilizarlo en el server. Estas rutas no tienen una "ruta raiz" ya que la agregaremos dependiendo la ruta que llegue. 

Por ejemplo si tenemos 2 router, uno para productos y otro para carritos, si llegara una petición get por ruta localhost:8080/productos automáticamente pasará por el router de productos y generará la respuesta de ese router. Mismo caso para una ruta localhost:8080/carritos.

```javascript

import { Router } from 'express';
const router = new Router();

import Manager from '../managers/manager.js';
const Manager = new Manager('path.json');

router.get('/', async(req, res)=>{
});
router.get('/:id', async(req,res) => {
});
router.post('/', async(req,res) => {
});
router.put('/:id', async(req,res) => {
});
router.delete('/:id', async(req,res) => {
})

export default router;
```
[+info express.router](https://expressjs.com/es/api.html#express.router)

---
### server.js
importamos express y lo guardamos en una constante 'app'.
importamos el router de la carpeta de routes.

express.json() es una función de middleware. Este método se utiliza para analizar las solicitudes entrantes con cargas útiles JSON y se basa en bodyparser.
Devuelve el middleware que sólo analiza JSON y sólo mira las peticiones en las que la cabecera content-type coincide con la opción type.

express.urlencoded({extended}) es un middleware integrado en Express.js. El objetivo principal de este método es analizar la solicitud entrante con cargas útiles codificadas con url y se basa en body-parser.
{extended} - Esta opción permite elegir entre analizar los datos codificados en URL con la biblioteca queryString o con la biblioteca qs.

Luego pasamos la ruta por defecto que utiliza el router.

Finalmente escribimos el app.listen con los parámetros del puerto del que queremos disponer y función anónima donde corroboramos que el server está funcionando "ok".

```javascript
import express from 'express';
const app = express();

import router from './routes/router.js';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/manager', router);

app.listen(8080, ()=>{
    console.log('Server OK on port 8080');
})
```
[+info express.json y express.urlencoded](https://expressjs.com/es/api.html)

---
# Static

Como utilizar una carpeta de uso público a través de servidor con express.
> Debemos tener en consideración que nuestro archivo package.json tenga la configuración "type":"module" para importar las funciones de express necesarias.

___

## server.js
En el archivo de server llamamos a express.static(), cuya función de middleware a la que le pasamos la ruta de la carpeta pública que contiene los archivos estáticos.
> Importante: La vía de acceso que proporciona a la función express.static es relativa al directorio desde donde inicia el proceso node. Si ejecuta la aplicación Express desde cualquier otro directorio, es más seguro utilizar la vía de acceso absoluta del directorio al que desea dar servicio (__dirname).

Debemos tener en cuenta que al inicio, en nuestro archivo package.json, modificamos la configuración de "type" a "module" para importar módulos ("type" por defecto viene seteado en "commonjs").
Para poder utilizar la función __dirname, debemos importarla previamente desde 'path' junto al módulo "fileURLToPath" desde 'URL'.

La función fileURLToPath() descodifica la URL del archivo a una cadena de ruta y garantiza que los caracteres de control de la URL (/, %) se añadan/ajusten correctamente al convertir la URL del archivo dada en una ruta.

```javascript
import { dirname } from 'path';
import { fileURLToPath } from 'URL';

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(__dirname + '/public'));

```
[+info dirname](https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_no_filename_or_dirname)

[+info fileURLToPath](https://nodejs.org/api/url.html#urlfileurltopathurl)

[+info import.meta.url](https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_import_meta_url)

---
# Middlewares
Funciones que se van a ejecutar antes de que el servidor procese la respuesta.

## Tipos de Middlewares para Express
- Middleware a nivel de aplicación
- Middleware a nivel de endpoint
- Middleware a nivel de Router
- Middleware de manejo de errores
- Middleware incorporado
- Middleware de terceros

## Como crear un Middleware
En una carpeta "middlewares" a nivel de server, creamos nuestros archivos middlewares.js.

### middleware.js
Un middleware es una función que recibe 3 parámetros:
- Objecto request
- Objeto response
- Función next

Imaginemos que queremos validar información de un usuario a través de un middleware. Si el campo "email" existe se ejecuta la función next, caso contrario devolvemos una respuesta de error.

```javascript
export const userValidator = (req, res, next) =>{
    const user = req.body;
    if(user.email) {
        next();
    }else{
        res.status(401).send({message: `Email not found`})
    }
}
```

En nuestro archivo de router vamos a utilizar el middleware creado.
Primero lo importamos desde el archivo creado anteriormente y lo llamamos entre la ruta y el endpoint.

```javascript
import { userValidator } from '../middlewares/middleware.js';

router.post('/', userValidator, async(req, res) =>{
    try{

        const {email, password} = req.body;
        const user {
            email,
            password
        };
        const newUser = await userManager.createUser(user);

    }catch(error){
        res.status(500).send({message:`error`});
    }
})
```
[+info Middleware para Express](http://expressjs.com/es/guide/writing-middleware.html#escritura-de-middleware-para-su-uso-en-aplicaciones-express)

## Middleware de terceros

### Morgan
Morgan nos devuelve información sobre las solicitudes que llegan al server:
- Método
- URL
- Estado
- Respuesta
- Tiempo de Respuesta

Primero debemos importarlo desde nuestro archivo server.js y después lo podemos utilizar con app.use __antes de las rutas__.
A morgan se le puede pasar varios parámetros como 'dev' o 'combined' dependiendo de la información que querramos traer.

```javascript
import morgan from 'morgan';

app.use(morgan('dev'));
app.use(morgan('combined'));
```

[+Info Express/Morgan](https://expressjs.com/en/resources/middleware/morgan.html)

---

# Multer
Primero debe ser instaldo desde la terminal en la carpeta que utilizaremos a nivel node.

```shell
npm i multer
```

En la carpeta de middlewares creamos un archivo para traer a multer multer.js

