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
    try {
        const user = {
            name: "Emiliano",
            firstName: "Pelegrino",
        };
        
        res.render('vista3', user);
    } catch (error) {
        res.send(error)
    }
})

const users = [
    {
        firstname: "Ezequiel",
        lastname: "Lopez",
        age: 24,
        mail: "ezelopez@mail.com"
    },
    {
        firstname: "Marcela",
        lastname: "Gomez",
        age: 25,
        mail: "marcegomez@mail.com"
    },
    {
        firstname: "Pamela",
        lastname: "Suarez",
        age: 33,
        mail: "pamesuarez@mail.com"
    },
    {
        firstname: "Eduardo",
        lastname: "Ramirez",
        age: 23,
        mail: "eduramirez@mail.com"
    }
];

router.get('/actividad', async(req, res)=>{
    try {
        res.render('actividad', {users})
    } catch (error) {
       res.send(error) 
    }
})

export default router;