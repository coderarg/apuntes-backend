import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';

import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';

import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js';
import prodRouter from './routes/products.router.js';

import './config/dbConnection.js';
import { connectionString } from './config/dbConnection.js';
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
    cookie:{
        sameSite: true
    },
    resave: false,
    saveUninitialized: false,
    cookie: {}
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', viewsRouter);
app.use('/api/', userRouter);
app.use('/api/products', prodRouter);

app.listen(8080, ()=>{
console.log('🚀 Server listening on port 8080');
});

