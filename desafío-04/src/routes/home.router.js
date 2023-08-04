import { Router } from 'express';

const homeRouter = Router();

homeRouter.get('/', async (req, res)=>{
    res.render('home');
})

export default homeRouter;