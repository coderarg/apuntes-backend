import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';

import userRouter from './routes/user.router.js';
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/views', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.listen(8080, ()=> {
    console.log(`Server OK 8080`);
});