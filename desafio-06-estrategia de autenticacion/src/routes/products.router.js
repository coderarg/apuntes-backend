import { Router } from 'express';
import * as productCtrl from '../controllers/products.controllers.js';
import passport from 'passport';
const prodRouter = Router();


prodRouter.get('/', passport.authenticate('github', {scope: ['user: email']}),  productCtrl.getAllProductsCtrl);

prodRouter.get('/readfile', productCtrl.readFileCtrl);


export default prodRouter;