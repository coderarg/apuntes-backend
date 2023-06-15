/* --------------------------------- 
              Node JS 
-------------------------------- */

/**
 * Generar 10000 números aleatorios de 1 a 20 y con estos crear un objeto donde se almacenen los números que salen y cantidad de veces que salió cada número


const obj = {};

for (let i = 1; i <= 10000; i++) {
    const num = Math.floor(Math.random() * 20) + 1;
    if (!obj[num]) {
        obj[num] = 1
    }else{
        obj[num]++
    }
    
}

console.log(obj);
 */


/* -------------------------- 
    Actividad FS y Crypto 
------------------------- 


const fs = require('fs');
const crypto = require('crypto');

class UserManager {
    constructor(path){
        this.path = path
    }

    async getUsers(){
        try {
            if(fs.existsSync(this.path)){
                const usersFile = await fs.promises.readFile(this.path, 'utf-8');
                const usersJS = JSON.parse(usersFile);
                return usersJS
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(obj){
        try {
            const user = {...obj};
            const usersFile = await this.getUsers()
            user.salt = crypto.randomBytes(128).toString();
            user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex');
            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
        } catch (error) {
            console.log(error);
        }
    }

    async validateUser(username, password){
        try {
            const usersFile = await this.getUsers();
            const user = usersFile.find((u) => u.username === username);
            if(!user){
                console.log('User not found');
                return;
            }
            //por buenas prácticas de seguridad debemos encriptar la contraseña que ingresa y compararla con la contraseña encriptada que tenemos guardad para no desencryptar la que ya tenemos guardada
            const newCrypto = crypto.createHmac('sha256', user.salt).update(password).digest('hex')
            if(user.password === newCrypto){
                console.log('log succesfully');
            }else{
                console.log('User or Password not valid');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

const manager = new UserManager('./users.json');

const user1 = {
    firstName: 'John',
    lastname: 'Doe',
    username: 'john.doe',
    password: '123456'
};

const user2 = {
    firstName: 'Jonny',
    lastname: 'Doe',
    username: 'jonny.doe',
    password: '654321'
}

const test = async()=>{
    //await manager.createUser(user1);
    //await manager.createUser(user2);
    //const users = await manager.getUsers();
    //console.log(users);
    await manager.validateUser('jonny.doe', '654321');
}

test();
*/


/* ---------------------- 
Instalar módulos de terceros 
---------------------- */

//instamos el módulo express

//primero instalamos node con "npm init -y"
//luego instalamos el módulo express "npm i express";
//luego iniciamos "npm i" para instalar las dependencias encontradas en el package.json

