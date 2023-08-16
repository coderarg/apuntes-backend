import passport from 'passport';
import { Router } from "express";
import { logoutUser } from "../controllers/user.controllers.js";
import { isAuth } from '../middlewares/isAuth.js';

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

router.get('/logout', logoutUser);
router.get('/private', isAuth, (req, res) => res.send('route private'));


export default router;