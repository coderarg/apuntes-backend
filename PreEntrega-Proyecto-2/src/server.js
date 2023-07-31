import './01-db/database.js';
import express from 'express';
import handlebars from 'express-handlebars';
import { errorHandler } from './06-middlewares/errorHandler.middleware.js';
import { __dirname } from './utils.js';

const app = express();

app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use(errorHandler);

/* app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + './07-views');
*/

app.listen(8080, ()=>{
    console.log('Server OK on port 8080');
})