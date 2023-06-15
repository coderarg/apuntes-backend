
/* --------------------------- Actividad en Clase GET POST PUT Y DELETE --------------------------- */


import express from 'express'; //importo express
import UserManager from './managers/user.manager.js'; //importo la clase UserManager

const app = express();

//esto debemos ponerlo siempre para tomar la info del cliente-front
app.use(express.json());//info que nos llega desde el body
app.use(express.urlencoded({extended:true})); //info que nos llega desde el url del cliente.

const userManager = new UserManager('./users.json');

/* ---------------------------------- - --------------------------------- */

//! No puede haber 2 rutas iguales porque se pisan
//Traigo todos los usuarios guardados
app.get('/users', async (req, res) => {
    try {
        const users = await userManager.getUsers(); //traigo los usuarios (si no hay archivo trae array vacio [])
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Traigo usuario por id
app.get('/users/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params; //traigo el id que viene del cliente/front desde el req.
        const user = await userManager.getUserById(Number(idUser)); //utilizo el método getUserById de userManager para buscar el usuario por id que se le pasa. !Importante: Utilizar Number() o parseInt() porque el id viene en formato string
        if (user) {
            res.json(user); //si existe lo devuelvo
        } else {
            res.status(400).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/search', async (req, res) => {
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

app.post('/users', async (req, res) => {
    try {

        //console.log(req.body);//desde acá tenemos accesos a lo que envía el cliente desde el </body>
        //const user = req.body
        const { firstName, lastName, email } = req.body; //traemos lo que envía el cliente
        const user = { //podemos guardarlo en un objeto y después enviarlo con createUser
            firstName,
            lastName,
            email
        }
        const newUser = await userManager.createUser(user)
        //await userManager.createUser({ firstName, lastName, email }) //también podemos hacerlo directamente - otra opción.
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put("/users/:idUser", async (req, res) => {
    try {
        const user = req.body;
        const { idUser } = req.params;
        const idNumber = parseInt(idUser);
        const userExist = await userManager.getUserById(idNumber);
        if (userExist) {
            await userManager.updateUser(user, idNumber);
            res.status(500).json({ message: `User id: ${idNumber} updated` });
        } else {
            res.status(400).json({ message: `User id: ${idNumber} Not found` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/users/:idUser', async (req, res) => {
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

app.listen(8080, () => {
    console.log('Server ok on port:8080');
});