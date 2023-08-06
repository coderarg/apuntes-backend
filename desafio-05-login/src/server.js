
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import '../src/database/connection.mongo.js';
import { connectionString } from '../src/database/connection.mongo.js';
import { userRouter } from './routes/user.router.js';
import __dirname from './utils.js';

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString
        /*  crypto: {
            secret: '1234'
        } */
    }),
    secret: 1234,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 120000
    }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use('/api', userRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.listen(8080, ()=> {
    console.log("k🏃 Server running on port 8080")
})