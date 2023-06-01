/* -------------------------------- 
            Callbacks
-------------------------------- 

const suma = (a,b) => a + b;

const resta = (a,b) => a - b;

const multiplicacion = (a, b) => a * b;

const division = (a, b) => a / b;
*/
/**
 * Es una función llamada por otra función como parámetro.
 * @param {number} a cualquier número
 * @param {number} b cualquier número
 * @param {function} callback división / multiplicación / suma / resta

const operaciones = (a, b, callback) => {
    console.log(callback(a, b));
}

operaciones(2, 2, suma);
operaciones(2, 2, resta);
operaciones(2, 2, multiplicacion);
operaciones(2, 2, division);
 */
/**
 * Un ejemplo de función anónima es la que utiliza en la función setTimeout.
 
setTimeout(() => {
    console.log("Buenas buenas.")
}, 3000);
*/
/**
 * Sincronismo VS Asincronismo
 * Promesas
 */

/**
 * Cómo crear una promesa donde le doy una condición para resolver o rejectar
 * @param {number} a numero
 * @param {number} b numero
 * @returns {number} promesa

const divisionPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("No se puede dividir un número por 0")
            
        }else{
            resolve (a/b);
        }
    })
}


divisionPromesa(1,3)
    .then((resultado) => {
        console.log(resultado);
        return resultado;
    }).catch((error) => console.log(error));

 */
/**
 * Async / Await
 * 
 * nos permite realizar más de una operación para una promsa. lo que then y catch no nos permite.


async function hola(){
    try {
        await
    } catch (error) {
        
    }
}



const divisionPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("No se puede dividir un número por 0")
            
        }else{
            resolve (a/b);
        }
    })
}

const divisionAsync = async (a, b) => {
    try {
        const response = await divisionPromesa(a, b);//que espere a que se resuelva la promesa que nos va a devolver otra promesa

        return response;
    } catch (error) {
        console.log(error);
    }
}

//si o si debemos meter la función aíncrona dentro de una función async porque no estamos tratando el resultado sino que estamos tratando la promesa que dió "ok" y nos va a dar el resultado a través de este "test"
const test = async() => {
    console.log(await divisionAsync(10, 0));
}

test();


const getData = () => {
    return new Promise((resolve, reject) => {
        setTimout(()=>{
            const error = true;
            if(!error) {
                resolve("Datos recibidos")
            }else{
                reject("Error al obtener datos")
            }
        }, 2000)
    })
};

const obtenerData = async () =>{
    try {
        const response = await getData();
        console.log(response)
    } catch (error) {
        console.log("error: ",error)
    }
};

obtenerData();
 */

/* ------------------------------ 
Tomar una api con fetch para resolver la promesa
Utilizando la api de users de github podemos traer la información de un usuario particular
 ----------------------------- 

const getDataGitHub = async(username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok) {
            throw new Error("Error al obtener información del usuario")
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

getDataGitHub('coderarg');
*/
/* ---------------------------------- 
Esto nos devuelve el siguiente objeto

{
  login: 'coderarg',
  id: 89136969,
  node_id: 'MDQ6VXNlcjg5MTM2OTY5',
  avatar_url: 'https://avatars.githubusercontent.com/u/89136969?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/coderarg',
  html_url: 'https://github.com/coderarg',
  followers_url: 'https://api.github.com/users/coderarg/followers',  following_url: 'https://api.github.com/users/coderarg/following{/other_user}',
  gists_url: 'https://api.github.com/users/coderarg/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/coderarg/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/coderarg/subscriptions',
  organizations_url: 'https://api.github.com/users/coderarg/orgs', 
  repos_url: 'https://api.github.com/users/coderarg/repos',        
  events_url: 'https://api.github.com/users/coderarg/events{/privacy}',
  received_events_url: 'https://api.github.com/users/coderarg/received_events',
  type: 'User',
  site_admin: false,
  name: 'Lucas García',
  company: null,
  blog: '',
  location: 'Buenos Aires, Argentina',
  email: null,
  hireable: true,
  bio: 'Estudiante de Informática',
  twitter_username: null,
  public_repos: 8,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2021-08-18T11:14:01Z',
  updated_at: '2023-04-12T18:21:31Z'
}
---------------------------------- */



/* -------------------------- 
    Actividad de promesas
------------------------- */

const divisionPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("No se puede dividir un número por 0");

        } else {
            resolve(a / b);
        }
    });
}

const sumaPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) {
            reject("Suma: Operación innecesaria")
            
        }else{
            resolve (a + b);
        }
    })
}

const restaPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a === 0 || b === 0) {
            reject("Resta: Operación innecesaria")
            
        }else if(a - b < 0){
            reject("Resta: la calculadora solo devuelve valores positivos.")
        }else{
            resolve (a - b);
        }
    })
}

const multiplicacionPromesa = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a < 0 ||b < 0) {
            reject("No se puede dividir un número por 0")
            
        }else{
            resolve (a * b);
        }
    })
}

const divisionAsync = async(a,b) => {
    try {
        const response = await divisionPromesa(a,b);
        return response;
    } catch (error) {
        console.log(error)
    }
}
const sumaAsync = async(a,b) => {
    try {
        const response = await sumaPromesa(a,b);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const restaAsync = async(a,b) => {
    try {
        const response = await restaPromesa(a,b);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const multiplicacionAsync = async(a,b) => {
    try {
        const response = await multiplicacionPromesa(a,b);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const test = async() => {

    console.log(await sumaAsync(7, 7));
    console.log(await restaAsync(10,7));
    console.log(await divisionAsync(10, 5));
    console.log(await multiplicacionAsync(2, 2));
}

test();