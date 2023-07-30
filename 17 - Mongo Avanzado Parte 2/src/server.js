import './0-db/database.js';
import express from 'express';
import morgan from 'morgan';
import usersRouter from './5-routes/users.router.js';
import petsRouter from './5-routes/pets.router.js';
import { errorHandler } from './6-middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));

app.use('/users', usersRouter);
app.use('/pets', petsRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));

