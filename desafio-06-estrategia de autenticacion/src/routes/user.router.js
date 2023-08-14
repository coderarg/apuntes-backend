import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controllers.js";

const router = Router();
import passport from 'passport';
import { isAuth } from '../middlewares/isAuth.js';

router.get('/logout', logoutUser);

router.post('/register', passport.authenticate('register'), registerUser);

router.post('/login', passport.authenticate('login'), loginUser);

router.get('/private', isAuth, (req, res) => res.send('route private'));

export default router;