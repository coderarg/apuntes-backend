import passport from 'passport';
import { Router } from "express";
import { logoutUser } from "../controllers/user.controllers.js";
import * as productCtrl from '../controllers/products.controllers.js';

const router = Router();


router.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/error-register',
    passReqToCallback: true
}));

router.post('/login', passport.authenticate('login', {
    successRedirect: '/api/products',
    failureRedirect: '/error-login',
    passReqToCallback: true
}));

router.get('/register-github', passport.authenticate('github', {scope:['user:email']}));


router.get('/logout', logoutUser);

export default router;