# Motores de Plantillas
Sirve para escribir HTML a través del BackEnd. Esto no se usa mucho ya que es reemplazado por el uso de Frameworks como VUE, React o Angular.

Los motores de plantillas más utilizados son Handlebar, EJS y PUGJS.

## Express y Handlebar
En este curso estaremos utilizando Handlebars.

Primero debemos instalar express y express-handlebars a través de la terminal.

```shell
npm i express
npm i express express-handlebars
```

### utils.js

En nuestro archivo de utils.js vamos a generar la dirección __dirname. Para ello importamos:

- dirname
- fileURLToPath

Luego creamos la __dirname y la exportamos.

```javascript
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;

```

### server.js
En nuestro archivo de server.js vamos a importar
- Express
- Handlebars
- Nuestra dirección __dirname de nuestro archivo utils.js
- El router de nuestro archivo router.js

Luego crearemos la app que va a usar express() y generamos los use de middlewares.

Debemos incluir el uso del motor (funcionalidades de la librería) de handlebars en la app y configurar donde se encontrarán las views que se renderizarán.

Finalmente realizamos la escucha del server en el puerto (8080 en nuestro caso).

```javascript
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views'); //Este es el nombre de la carpeta (views) donde guardaremos no solo las vistas, sino también layouts y partials.
app.set('view engine', 'handlebars'); //Aquí colocaremos el nombre del motor de handlebars llamado "view engine".
app.listen(8080, ()=> {
    console.log(`Server OK 8080`);
})

```

### main.handlebars
Crearemos una carpeta llamada views dentro de src donde a su vez crearemos otra carpeta llamada layout.  
Dentro de esta úlitma crearemos el archivo main.handlebars donde escribiremos el cuerpo principal del archivo html.  
Este archivo será tratado como un index.html, y es donde escribiremos la etiqueta {{{body}}}  de handlebars donde queremos renderizar nuestras views. 
También podremos importar el archivo de css desde nuestra carpeta public.

```handlebars
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/css/styles.css">
    <title>Handlebars</title>
</head>
<body>
    <h1>Bienvenidos a la clase de Handlebars!</h1>
   	{{{body}}}
    <p>fin de layout</p>
</body>
</html>
```

### vista1.handlebars.js
En nuestra vista 1 escribiremos lo que queremos renderizar, también en formato html.

```handlebars
<h1>Primer Vista</h1>
```

### router.js
En la carpeta de src>routes guardaremos el router.js. Este nos permite renderizar las vistas según el request que se le envía.

Importamos Router, lo guardamos en una constante y generamos las distintas rutas.

```javascript
import {Router} from 'express';
const viewsRouter = Router();

viewsRouter.get('/vista1', async (req, res) => {
    try {
        res.render('vista1')
    } catch (error) {
        res.send("Error")
    }
})

viewsRouter.get('/vista2', async (req, res) => {
    try {
        res.render('vista2')
    } catch (error) {
        res.send("Error")
    }
})

viewsRouter.get('/vista3', async (req, res) => {
    const user = {
        name: "Emiliano",
        firstName: "Pelegrino",
    };
    
    res.render('vista3', user)
})
export default viewsRouter;
```

## Test
Dentro de nuestro navegador escribiremos en la url el localhost:8080 y a continuación la ruta del router que queremos renderizar.

Ejemplos:

```
localhost:8080/vista1
localhost:8080/vista2
localhost:8080/vista3
```

## Partials
Además de los layouts, tenemos partial: son componentes que se pueden repetir y se guardan dentro de la carpeta views>partials. Luego se renderizan llamándolos desde una vista
### partial.handlebars
```handlebars
<div>
    <h1>Partial</h1>
    <ul>
        <li>Li1</li>
        <li>Li2</li>
        <li>Li3</li>
    </ul>
</div>
```

### vista2.handlebars
```handlebars
{{>partial}}
<h2>Esta es la vista 2</h2>
```

## Variables
Para poder renderizar variables, debemos especificar en la ruta cual es el dato que vamos a renderizar.

### router.js
```javascript
router.get('/vista3', async (req, res) => {
    const user = {
        name: "Emiliano",
        firstName: "Pelegrino",
    };
    
    res.render('vista3', {user})
})
export default router;
```

### vista3.handlebars
```javascript
<div>
    <h1>Bienvenido {{user.name}}</h1>
</div>
```

Para poder renderizar un array de datos debemos escribirlo con la sintaxis correspondiente de handlebars.

```handlebars
<div>
    <h1>Lista de elementos</h1>
    {{#if users.length}}
        {{#each users}}
            <ul>
                <li>{{firstname}}</li>
                <li>{{lastname}}</li>
                <li>{{age}}</li>
                <li>{{mail}}</li>
            </ul>
        {{/each}}
        {{else}}
        <p>No hay usuarios</p>
    {{/if}}    
</div>
```
[+ info Handlebars](https://handlebarsjs.com/)  
[+ info Handlebars](https://www.npmjs.com/package/handlebars)


## Actividad con Handlebars



## Notas a parte  
### Recomendación de tutor:
> _"Te recomiendo ir mirando AWS y bases de Cloud Computing y con eso tenes hosting gratis si sabes manejarlo y se consigue mucho laburo de eso."_

### Cómo configurar Snippets en VSCode  
-> Ctrl + Shift + p  
-> set user snipets  
-> javascript
-> al abrir el json donde podremos escribir código que escribimos frecuentemente configuramos los snippets de la siguiente manera.

"ejemplo": {
	"prefix": "_ejemplo",
	"body": {
		"cada linea de código entre comillas"
	}
}


