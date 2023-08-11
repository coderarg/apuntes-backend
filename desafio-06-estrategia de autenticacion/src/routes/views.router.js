import { Router } from "express";
const router = Router();
import * as viewsCtrl from "../controllers/views.controllers.js";

router.get('/', viewsCtrl.login);
router.get('/register', viewsCtrl.register);
router.get('/error-login', viewsCtrl.errorLogin);
router.get('/error-register', viewsCtrl.errorRegister);
router.get('/products', viewsCtrl.products);

export default router;