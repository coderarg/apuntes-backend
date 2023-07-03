import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import router from './routes/router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', router);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.listen(8080, ()=>{
    console.log(`Server running on port 8080`);
})