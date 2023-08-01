import { Router } from 'express';
import * as cartCtrl from '../controllers/carts.controllers.js';

const cartRouter = Router();

cartRouter.get('/getcartbyid/:id', cartCtrl.getCartByIdCtrl);

cartRouter.post('/createcart', cartCtrl.createCartCtrl);
cartRouter.post('/addprodtocart/:cid/:pid', cartCtrl.addProdToCartCtrl);

cartRouter.delete('/deleteprod/:cid/:pid', cartCtrl.deleteProdCtrl);
cartRouter.delete('/deletecart/:cid', cartCtrl.deleteCartCtrl);


export default cartRouter;