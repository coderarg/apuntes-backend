/**
 * Set Timeout
 * Nos permite ejecutar una función o proceso fuera del colstack, de forma asíncrona, al final de todas las ejecuciones, aunque el tiempo establecido sea de "0" cero

setTimeout(()=>{
    console.log('console de settimeout')
}, 0);
 */
/**
 * setInterval
 * Nos permite ejecutar un código repetidamente cada x tiempo, de forma indeterminada o hasta que se ejecute un clearInterval

setInterval(()=>{
    console.log("console setInterval")
}, 3000);

clearInterval();
 */


/* -------------------- 
Manejo de archivos con JavaScript
------------------- */
/**
 * Para esto debemos importar el uso de fs = File System de Node JS.
 * Este módulo tiene métodos para poder utilizarlo de manera sincrónica o asincrónica. 
 * Si vamos a manejar grandes cantidades de datos, es recomendable utilizarlos de manera asincrónica
 * documentación en https://nodejs.org/api/fs.html
 *  
 * Los métodos sincrónicos en filesystem se diferencian por tener escrito "Sync" al final del nombre.
*/

/**
 * Importamos en una variable los métodos de file System


const fs = require('fs');
 */
/**
 * Constante donde se guardan los archivos que produciremos con FS

const path = './file1.txt';
 */
/**
 * Abrimos un condicional para ver si existe el archivo en esa ruta o debemos escribir un nuevo archivo

if (fs.existsSync(path)) {
    //Si existe el archivo lo leemos, lo decodificamos según utf-8 y guardamos esta lectura en una constante.
    const info = fs.readFileSync(path, 'utf-8') //UTF-8 o Latin-1
    console.log(info);
    fs.appendFileSync(path, "Segundo Texto")
}else{
    //Si no existe debemos escribir un nuevo archivo en la ruta "path" deseada y le damos el nombre del nuevo archivo
    fs.writeFileSync(path, 'Primer Texto')
}
 */

/**
 * Esto no se debe hacer, hoy en día fue reemplazado con fs de manera asincrónica con promesas con .then y .cath

const path2 = './file2.txt';

if(fs.existsSync(path2)){
    fs.readFile(path2, 'utf-8', (error, info)=>{
        if(error){
            console.log(error)
        }else{
            console.log(info);
            fs.appendFile(path2, ' segundo texto', (error, info) =>{
                if(error){
                    console.log(error)
                }else{
                    console.log('info adicionada con éxito!');
                    fs.readFile(path, 'utf-8', (error, info)=>{
                        if(error){
                            console.log(error);
                        }else{
                            console.log(info);
                        }
                    })
                }
            })
        }
    })
}else{
    fs.writeFile(path, 'primer texto con callback', (error) => {
        if(error){
            console.log(error);
        }else{
            console.log("archivo creado con éxito");
        }
    })
};
 */


/**
 * File System con promesas .then y .catch


const fs = require('fs');

const path = './file.txt';

if(fs.existsSync(path)){
    //a través de promesas leemos el archivo.
    fs.promises.readFile(path, 'utf-8')
        .then((info)=>{ //si existe la info en ese archivo retornamos una promesa con el archivo modificado
            console.log(info);
            return fs.promises.appendFile(path, 'segundo texto')
        })
        .then(()=>{ //tomamos la promesa y leemos el archivo modificado con la anterior promesa
            console.log('info agregada con éxito');
            return fs.promises.readFile(path, 'utf-8');
        })
        .catch((error)=>{ //En caso que tengamos un error devuelve el error
            console.log(error);
        })
}else{//Si no existe el archivo creamos un archivo con promesas
    fs.promises.writeFile(path, 'primer texto')
        .then(()=>{//Si crea el archivo devuelve un "archivo creado con éxito"
            console.log('archivo creado con éxito');
        })
        .catch((error)=>{//En caso de un error devuelve el error.
            console.log(error);
        })
}
 */
/* --------------------- Si quisiéramos guardar objetos --------------------- 

const products = [
    {
        name: 'Iphone',
        price: 50000,
        stock: 50
    },
    {
        name: 'Samsung G20',
        price: 40000,
        stock: 30
    },
    {
        name: 'Motorola C115',
        price: 30000,
        stock: 60
    }
];
*/
/**
 * Para poder guardar esta información en un archivo debemos parsearla a json con el método JSON.stringify(product)
 

const pathJson = './products.json';

fs.writeFileSync(pathJson, JSON.stringify(products))
const info = fs.readFileSync(pathJson, 'utf-8');
const infoJS = JSON.parse(info)
*/
//!stringify --> es para guardar la info de javascript a JSON
//!parse --> para traer la info de JSON a javascript

/* ------------------------ Actividad con Async Await ----------------------- */

const fs = require('fs');

class UsersManager {
    constructor(path){
        this.path = path
    }

    async getUsers(){
        try {
            if(fs.existsSync(this.path)){
                const users = await fs.promises.readFile(this.path, 'utf-8');
                const usersJS = JSON.parse(users);
                return usersJS;
            }else{
                return []; //si no existe retorna un array vacío ya que este método solo lee
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * createUser
     * @param {object} user usuario
     * @returns {object} usuario cargado
     */
    async createUser(user){
        try {
            const usersFile = await this.getUsers();
            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile)); //no tulizamos el appendFile ya que no se puede utilizar con elementos parseados
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

const manager = new UsersManager('./users.json');

const user1 = {
    firstName: 'Gastón',
    lastNAme: 'Merlo',
    age: 45
}
const user2 = {
    firstName: 'Matías',
    lastNAme: 'Firpo',
    age: 38
}

const test = async () =>{
    const getUsers = await manager.getUsers();
    console.log('primer consulta', getUsers);

    await manager.createUser(user1);
    const getUsers2 = await manager.getUsers();
    console.log('segunda consulta', getUsers2);

    await manager.createUser(user2);
    const getUsers3 = await manager.getUsers();
    console.log('tercera consulta', getUsers3);
}

test();

