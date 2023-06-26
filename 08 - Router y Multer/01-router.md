# Router

## Router
Paso a paso de como realizar rutas con administrador de archivos con express.

> Debemos tener en consideración que nuestro archivo package.json tenga la configuración "type":"module" para importar las funciones de express necesarias.
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
___

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