import './db/database.js';
import express from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { __dirname } from './utils.js';
import prodRouter from './routes/products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(errorHandler);

app.use('/products', prodRouter)

const port = 8080;

app.listen(port, ()=>{
    console.log('Server OK on port 8080');
})