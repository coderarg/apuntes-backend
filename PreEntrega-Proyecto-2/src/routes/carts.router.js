import { Router } from 'express';
import * as cartCtrl from '../controllers/carts.controllers.js';

const cartRouter = Router();

cartRouter.get('/createcart', cartCtrl.createCartCtrl);
cartRouter.get('/getcartbyid/:id', cartCtrl.getCartByIdCtrl);

export default cartRouter;