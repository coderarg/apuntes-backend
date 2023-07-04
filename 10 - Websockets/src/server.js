//importamos express
import express from 'express'; 
//importamos handlebars
import handlebars from 'express-handlebars'; 
//importamos Server de socket.io
import { RemoteSocket, Server } from 'socket.io'; 

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

//hacemos una escucha al socketServer del evento "connection" y dentro de esta función anónima vamos a configurar las funciones y escuchas del socket server.
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

