import { Router } from 'express';
import * as productCtrl from '../controllers/products.controllers.js';
const prodRouter = Router();


prodRouter.get('/', productCtrl.getAllProductsCtrl);
prodRouter.get('/getbyid/:id', productCtrl.getProdByIdCtrl);
prodRouter.get('/getbycode/:codetf', productCtrl.getByCodeCtrl);

prodRouter.post('/readfile', productCtrl.readFileCtrl);
prodRouter.post('/createprod', productCtrl.createProductCtrl);

prodRouter.put('/updateprod/:id', productCtrl.updateProdCtrl);

prodRouter.delete('/delete/:id', productCtrl.deleteProdCtrl);

export default prodRouter;