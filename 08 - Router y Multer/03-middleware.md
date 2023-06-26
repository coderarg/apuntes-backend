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
---
## Middleware a nivel aplicación

### Morgan


