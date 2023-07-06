# Websocket
Websocket es un protocolo de comunicación basado en TCP para poder establecer esa conexión entre el cliente y el servidor; una alternativa a HTTP.

La diferencia entre HTTP y Websocket es que HTTP  es unilateral y en Socket es bilateral.

En HTTP se recibe una información, procesa la petición y la envía la respuesta al cliente. En este punto se termina la comunicación server-client.

En el caso de Websocket, aunque el cliente también inicia la comunicación, la comunicación se mantiene abierta a pesar de que el cliente no le siga enviando solicitudes.

## Socket.io
Para poder implementar Websockets vamos a utilizar Socket.io

Instalamos express, handlebars y socket.io
```shell
npm init -y
npm i nodemon express express-handlebars socket.io
```

### index.js 
Dentro de la carpeta './src/public' creamos el archivo index.js. Para poder utilizar socket.io del lado del cliente solo deberemos guardarlo en una constante de socketClient

```javascript
const socketClient = io();
```

### main.handlebars
Dentro de la carpeta "./src/views/layouts" creamos el archivo de main.handlebars que contendrá la etiqueta body donde renderizaremos.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSockets</title>
</head>
<body>
    {{{body}}}
</body>
</html>
```

### websockets.handlebars
Dentro de la carpeta de views agregamos el archivo websockets.handlebars y creamos un formulario.
De este formulario obtendremos la información que luego podremos guardar en una base de datos.

```handlebars
<h2>Socket</h2>
<form id="form">
    <label for="name">Product: </label><input type="text" name="name" id="name">
    <label for="price">Precio: </label><input type="number" name="price" id="price">
    <input type="submit" value="send">
</form>

<p id="products"></p>

<!-- agregamos el script de Socket.io para motores de plantillas-->
<script src="/socket.io/socket.io.js"></script>
<!-- agregamos el script del index.js -->
<script src="index.js"></script>
```
En caso de utilizar Socket.io para un framework podremos instalar una librería desde socket.io
```javascript
import { io } from 'socket.io-client';
```  
[+info Socket.io Client](https://socket.io/docs/v4/client-api/)

### server.js
```javascript
//importamos express
import express from 'express'; 
//importamos handlebars
import handlebars from 'express-handlebars'; 
//importamos Server de socket.io
import { Server } from 'socket.io'; 

//importamos __dirname
import __dirname from './utils.js'; 

//guardamos express en app
const app = express(); 

//uso de json
app.use(express.json()); 
//uso de url
app.use(express.urlencoded({extended:true})); 
//coniguaramos la carpeta public
app.use(express.static(__dirname + './public')); 

// configuramos el motor de handlebars
app.engine('handlebars', handlebars.engine()); 
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')

app.get('/', (req, res)=>{
    res.render('websockets')
})

//guardamos la app de engine en un httpServer
const httpServer = app.listen(8080, ()=> {
    console.log("Server ok on port 8080");
})

//para luego pasársela al Server de socket.io
const socketServer = new Server(httpServer);

const products = [];

//hacemos una escucha al socketServer del evento "connection" y dentro de esta función anónima que toma como parámetro la callback del socket del cliente, vamos a configurar las funciones y escuchas del socket server.
socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    })

    socket.emit('saludoDesdeBack', 'Bienvenido a websocket')

    socket.on('respuestaDesdeFront', (message)=>{
        console.log(message);
    })

    socketServer.emit('arrayProducts', products);
    
    socket.on('newProduct', (obj) =>{
        products.push(obj);
        socketServer.emit('arrayProducts', products);
    })

    //emit desde ruta post
    app.post('/', (req, res) => {
        const { message } = req.body;
        socketServer.emit('message', message);
        res.send('se envió mensaje al socket del cliente');
    });
});
```

 