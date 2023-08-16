import passport from 'passport';
import { Router } from "express";
import { loginUser, registerUser, logoutUser, githubResponse } from "../controllers/user.controllers.js";
import { isAuth } from '../middlewares/isAuth.js';

const router = Router();

router.get('/logout', logoutUser);

router.post('/register', passport.authenticate('register'), registerUser);

router.post('/login', passport.authenticate('login'), loginUser);

router.get('/private', isAuth, (req, res) => res.send('route private'));

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse);

export default router;