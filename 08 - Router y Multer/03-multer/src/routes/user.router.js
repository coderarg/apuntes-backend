/* import express from 'express';
const router = express.Router(); 
esto nos trae todo express*/

//Acá solamente traemos el método Router
import { Router } from 'express';
import { userValidator } from '../middlewares/userValidator.js'
const router = Router();


import UserManager from '../managers/user.manager.js';

const userManager = new UserManager('/users.json');

router.get('/', async (req, res) => {
    try {
        const users = await userManager.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const user = await userManager.getUserById(Number(idUser));
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/search', async (req, res) => {
    try {
        const { idUser } = req.query;
        const user = await userManager.getUserById(Number(idUser));
        if (user) {
            res.json(user);
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', userValidator, async (req, res)=>{
    try {
        const { firstName, lastName, email, role } = req.body;
        const user = { firstName, lastName, email, role};
        const newUser = await userManager.createUser(user);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/:idUser", async (req, res) => {
    try {
        const user = req.body;
        const { idUser } = req.params;
        const idNumber = parseInt(idUser);
        const userExist = await userManager.getUserById(idNumber);
        if (userExist) {
            await userManager.updateUser(user, idNumber);
            res.json({ message: `User id: ${idNumber} updated` });
        } else {
            res.status(400).json({ message: `User id: ${idNumber} Not found` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const idNumber = parseInt(idUser);
        const userExist = await userManager.getUserById(idNumber);
        if (userExist) {
            await userManager.deleteUser(idNumber);
            res.json({message: `User ${idNumber} deleted ok`});
        } else {
            res.json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
});

export default router;