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