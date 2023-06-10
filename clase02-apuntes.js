
//!Funcionalidades nuevas en EcmaScript 7
/*--------------------- potencia ------------------ */
/**
 * Nueva funcionalidad de potencia en ES7.
 * Pasa de utilizar el Math.pow(base, exponente) a base ** exponente;
 */
const expMath = Math.pow(2,3);
const expES7 = 2 ** 3;


/*--------------------- includes ------------------ */
/**
 * Se utiliza el método include para buscar si un elemento existe o no en un array
 * @returns {boolean} Puede retornar true or false
 */
const array = [1, 2, 3, 4, 5, 6];

console.log(arrayTest.includes(8));

const arrayNombres = ['juan', 'pedro', 'esteban'];
/**
 * Función que utiliza include para saber si un nombre existe en un array 
 * @param {array} array
 * @returns {string} Si es true "acceso permitido", si es false "acceso denegado"
 */
const test1 = array => {
    if(array.includes('pedro'))
    return 'incluye pedro'
    else return 'acceso denegado'
}


test1(arrayNombres);


/*--------------------- some ------------------ */
/**
 * @typedef {object} personas
 * 
 */
const personas = [
    {
        name: 'Juan',
        age: 28
    },
    {
        name: 'Jose',
        age: 35
    },
    {
        name: 'Ignacio',
        age: 40
    },
];

let ageSearch = 35;
let exist = personas.some((person)=>{
    return person.age === ageSearch;
});

if(exist) {
    console.log(`Existe una persona con la edad de ${ageSearch} en el array`);
}else{
    console.log(`No existe ninguna persona con la edad de ${ageSearch}`);
}

//!Funcionalidades nuevas en EcmaScript 8



const objeto1 = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

/**
 * !Object.entries
 * Nos devuelve un array las propiedades y valores de un objeto
 * @param {object} 
 * @returns {array} 
 */
Object.entries(objeto1)

/**
 * !Object.values
 * Nos devuelve un array con las valores de un objeto
 * @param {object} 
 * @returns {array} 
 */
Object.values(objeto1)

/**
 * !Object.entries
 * Nos devuelve un array con las propiedades de un objeto
 * @param {object} 
 * @returns {array} 
 */
Object.keys(objeto1)


//!Funcionalidades nuevas en EcmaScript 9

/*--------------------- spread operator------------------ */


const arrayso = [1, 2, 3, 4, 5, 6, 7];
console.log(array);
/**
 * Spread operator
 * Método que separa los elementos del array y los trata por separado.
 * Se utiliza sumar arrays o elementos a un array.
 * También para sumar elementos a un objeto
 */
console.log(...array);

const objeto2 = {
    ...objeto1,
    d: 4
};

/*--------------------- rest operator------------------ */

/**
 * Función que toma indefinidos parámetros y le aplica la misma función
 * @param {any} a 
 * @param {any} b 
 * @param  {...any} otherParametros 
 */
const myFuncRestOperator = (a, b, ...otherParametros) => {
    console.log(a);
    console.log(b);
    console.log(otherParametros);
}

/*--------------------- Activad------------------ */

//Realizar un nuevo array que contenga todos los tipos de productos(keys) utilizando objects.keys y array.inclues, y mostrar por consola.
//Obtener el total de productos vendidos

const productos =  [
    	{
    		manzanas:3,
    		peras:2,
    		carne:1,
    		jugos:5,
    		dulces:2
	},
    	{
    		manzanas:1,
    		sandias:1,
    		huevos:6,
    		jugos:1,
    		panes:4
	}
]

/**
 * Array que empieza vació donde seguardan las keys de los productos, los cuales no pueden repetirse.
 * @type {array}
 */
const keysNoRepeat = [];

/**
 * variable donde guardamos la cantidad total de todos los productos vendidos
 */
let sum = 0;

/**
 * recorro el array de objectos con forEach, por cada prod(objecto) guardo las keys y los values en variables distintas.
 * @param {array > object} array de objectos
 */
productos.forEach((prod)=>{
    
    /**Llaves
     * Array donde guardo las keys de los objetos
     * @type {array}
     */
    const llaves = Object.keys(prod);
    console.log(llaves);
    /**Valores
     * Array donde guardo los valores de los objetos
     * @type {array}
     */
    const valores = Object.values(prod);

    /**
     * Recorremos el array de keys y vamos guardando los valores en el array keysNoRepeat no existe la key
     */
    llaves.forEach((element) =>{
        if(!keysNoRepeat.includes(element)) {
            keysNoRepeat.push(element)
        }
    });

    /**
     * sumamos en la variable sum todos los valores de ventas de cada elemento que guardamos en values
     */

    valores.forEach((element) => {
        sum += element
    });

});

console.log(keysNoRepeat);
console.log(sum);



/*---------------------ES9 flat------------------ */

const arrayNoFlat = [1, 2, 3, [4, 5], 6];

/**
 * .flat(profuncidad)
 * Nos permite borrar los corchetes de arrays dentro de un array para que todos los elementos pertenezcan al mismo nivel.
 * @param {number} profundidad
 */

//Array totalmente "plano"
const arrayFlat = arrayNoFlat.flat();

const arrayNoFlatMax = [1, 2, 3, [[4, 5], 6]];
const arrayFlatMax = arrayNoFlat.flat(2);


/*---------------------ES10 nullish------------------ */

/**Operador Nullish (??)
 * El operador Nullish devuelve el valor si existe, de lo contrario devuelve el siguiente.
 * Los valores falsey
 * 0
 * null
 * undefined
 * false
 * NaN
 * '' String vacío
 */

let altura = 0;
console.log('Altura', altura || 100); //Devuelve 100
console.log('Altura', altura ?? 100); //Devuelve 0 porque existe
console.log();

/*---------------------ES11 variables rivadas------------------ */

class Person {
    /**
     * Variable privada que solo puede accederse desde el constructor y desde un método dentro de la clase.
     * !Siempre se definen fuera del constructor.
     */
    #fullName;
    constructor(firstName, lastName,){
        this.firstName = firstName;
        this.lastName = lastName;
        this.#fullName = `${this.firstName} ${this.lastName} `
    }

    getFullName(){
        return this.#fullName;
    }

    /**
     * Metodo privado
     * A este método NO puedo acceder desde afuera de la clase
     * @returns string
     */
    #metodoPrivado(){
        return "Soy un método privado"
    }

    getMetodoPrivado(){
        return this.#metodoPrivado;
    }
}

/*---------------------Actividad------------------ */

//?Registrador de tickets de eventos

class TicketManager {
    #priceBaseGain = 0.15;

    /**Dejo el constructor vacío y le asigno un array para que inicie vacío. */
    constructor(){
        this.events = [];
    }

    /**
     * Método que toma parámetros y guarda eventos
     * @param {string} name nombre del evento
     * @param {string} site lugar
     * @param {number} price precio
     * @param {number} capacity capacidad
     * @param {date} [date] fecha de hoy con new Date() o fecha con formato "aaaa/mm/dd"
     * @returns {object} event lo pushea a los eventos
     */
    addEvent(name, site, price, capacity = 50, date = new Date()) {
        const event = {
            id: this.#getMaxId + 1,
            name,
            site,
            capacity,
            price: price + this.#priceBaseGain,
            date,
            participants: []
        }

        this.events.push(event)
    }

    /**
     * Método privado que recorre los eventos y asigna un Id autoincremental
     */
    #getMaxId(){
        let maxId = 0;
        this.events.map((event) =>{
            if(event.id > maxId) {
                maxId = event.id;
            }
            return maxId;
        })
    }

    /**
     * Método para devolver todos los eventos
     * @returns {array > object}
     */
    getEvents(){
        return this.events;
    }

    /**
     * Agregar un usuario al evento: Los envía al array de "participants" de cada evento
     * @param {number} idEvent id de evento
     * @param {string} idUser nombre de usuario
     */
    addUser(idEvent, idUser){
        const event = this.#getEvent(idEvent);
        if(event) {
            if(!event.includes(idUser)) event.participants.push(idUser);
        }else{
            console.log("This event doesn't exist!");
        }
    }
    /**
     * 
     * @param {number} idEvent id de evento 
     * @returns {object} idEvent
     */
    #getEvent(idEvent){
        return this.event.find(event => event.id === idEvent);
    }


    
    //genera un nuevo evento a partir de un evento ya existente con nuevo 
    /**
     * 
     * @param {number} idEvent numero de id
     * @param {string} newSite Sitio donde se realiza el evento
     * @param {date} [newDate] Fecha cuando se realiza el evento
     */
    eventTour(idEvent, newSite, newDate){
        const event = this.#getEvent(idEvent);
        if(event){
            const newEvent = {
                ...event,
                id: this.#getMaxId() + 1,
                site: newSite,
                date: new Date(),
                participants: []
            };
            this.events.push(newEvent)
        }else{
            console.log("This event doesn't exist")
        }
    }
}

const ticketManager = new TicketManager();

ticketManager.addEvent('Argentina vs Nigeria', 'Santiago del Estero', 56000, 600000);

ticketManager.addEvent('México vs Brasil', 'Córdoba', 56000, 300000);
ticketManager.addEvent('Recital Metálica', 'Buenos Aires', 100000, 1000000);

console.log(ticketManager.getEvents());

ticketManager.addUser(1, 'Alejandro');
ticketManager.addUser(1, 'Mateo');

console.log(ticketManager.getEvents());

ticketManager.eventTour(3,'Buenos Aires', new Date("2023/06/27"));
