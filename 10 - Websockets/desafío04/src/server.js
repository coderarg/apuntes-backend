//Imports express
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

//Dirname route
import { __dirname } from './utils.js';

//Product Manager
import ProductManager from './managers/products.manager.js';
const productManager = new ProductManager(__dirname + '/files/products.json');

//Setting app
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//Routes
import homeRouter from './routes/home.router.js';
import productsRouter from './routes/products.router.js';
app.use('/', homeRouter);
app.use('/realtimeproducts', productsRouter);

//Setting Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Setting httpServer
const httpServer = app.listen(8080, ()=>{
    console.log("Server ok on port 8080");
})
const socketServer = new Server(httpServer);

const productsArray = [];

//Socket Server
socketServer.on('connection', async(socket)=>{
    console.log("Cliente Conectado");
    
    socket.emit('productsArray', await productManager.getProducts());
    
    socket.on('productObject', async(object)=>{

        await productManager.addProduct(object)

        socket.emit('productsArray', await productManager.getProducts());
    });
    
})