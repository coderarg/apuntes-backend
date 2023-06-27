import {Router} from 'express';
const router = Router();

router.get('/vista1', async (req, res) => {
    try {
        res.render('vista1')
    } catch (error) {
        res.send("Error")
    }
})


router.get('/vista2', async (req, res) => {
    try {
        res.render('vista2')
    } catch (error) {
        res.send("Error")
    }
})

router.get('/vista3', async (req, res) => {
    const user = {
        name: "Emiliano",
        firstName: "Pelegrino",
    };
    
    res.render('vista3', user)
})
export default router;