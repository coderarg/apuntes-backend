import express from 'express';
import { __dirname } from './utils';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended}));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');

app.listen(8080, ()=> {
    console.log(`Server OK 8080`);
})