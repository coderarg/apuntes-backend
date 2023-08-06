import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', async (req, res)=>{
    res.render('realTimeProducts');
})

export default productsRouter;