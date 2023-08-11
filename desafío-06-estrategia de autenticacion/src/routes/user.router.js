import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controllers.js";
const router = Router();

router.get('/logout', logoutUser);

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;