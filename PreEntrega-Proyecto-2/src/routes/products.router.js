import { Router } from 'express';
import * as productCtlr from '../controllers/products.controllers.js';
const prodRouter = Router();

prodRouter.get('/getall', productCtlr.getAllProductsCtrl);
prodRouter.get('/getbyid/:id', productCtlr.getProdByIdCtrl);
prodRouter.get('/getbycode/:codetf', productCtlr.getByCodeCtrl);

prodRouter.post('/readfile', productCtlr.readFileCtrl);
prodRouter.post('/createprod', productCtlr.createProductCtrl);

prodRouter.put('/updateprod/:id', productCtlr.updateProdCtrl);

prodRouter.delete('/delete/:id', productCtlr.deleteProdCtrl);

export default prodRouter;