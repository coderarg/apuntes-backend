import * as productCtlr from '../04-controllers/products.controllers.js';
import { Router } from "express";
const prodRouter = Router();

prodRouter.post('/readfile', productCtlr.readFileCtrl);
prodRouter.get('/getall', productCtlr.getAllProductsCtrl);
prodRouter.post('/createprod', productCtlr.createProductCtrl);


export default prodRouter;
