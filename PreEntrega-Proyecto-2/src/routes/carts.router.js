import { Router } from 'express';
import * as cartCtrl from '../controllers/carts.controllers.js';

const cartRouter = Router();

cartRouter.get('/getcartbyid/:id', cartCtrl.getCartByIdCtrl);

cartRouter.post('/createcart', cartCtrl.createCartCtrl);
cartRouter.post('/addprodtocart/:cid/:pid', cartCtrl.addProdToCartCtrl);

export default cartRouter;