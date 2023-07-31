import { Router } from 'express';
import * as productCtlr from '../controllers/products.controllers.js';
const prodRouter = Router();

prodRouter.post('/readfile', productCtlr.readFileCtrl);
prodRouter.get('/getall', productCtlr.getAllProductsCtrl);
prodRouter.post('/createprod', productCtlr.createProductCtrl);

export default prodRouter;