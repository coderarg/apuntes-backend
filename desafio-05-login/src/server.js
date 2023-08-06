import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';

import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import prodRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

import './db/database.js';
import { connectionString } from './db/database.js';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use('/users', userRouter);
app.use('/', viewsRouter);
app.use('/api/products', prodRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, ()=>{
console.log(' Server listening on port 8080');
});