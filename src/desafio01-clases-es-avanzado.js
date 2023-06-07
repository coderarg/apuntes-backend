/**
 * Clase con ECMAScript y ECMAScript avanzado
 * Consigna
 * Realizar una clase "ProductManager" que gestione un conjunto de productos.
 * Debe crearse desde su constructor con el elemento "productos", el cual será un arreglo vacío.
 * Cada producto que gestione debe contar con las propiedades
 *  -title (nombre del producto)
 *  -description (descripción del producto)
 *  -price (precio)
 *  -thumbnail (ruta de imagen)
 *  -code (código identificador)
 *  -stock (número de piezas disponibles)
 * 
 * Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial.
 *  -Validar que no se repita el campo "code" y que todos los campos sean obligatorios.
 *  -Al agregarlo, debe crearse con un id autoincremental.
 * 
 * Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
 *   -En caso de no coincidir ningún id, mostrar en consola un error “Not found”
 * 
 * Formato del entregable
 * Archivo de Javascript listo para ejecutarse desde node.

 */

class ProductManager {
    constructor(){
        this.productos = []
    }
    #nextId = 1;

    /**addProduct:
     * Método que agrega productos al array "productos"
     * @key {number} id se genera id autoincremental auto con this.nextId
     * @param {string} title titulo del producto
     * @param {string} description descripción del producto
     * @param {number} price precio
     * @param {string} thumbnail ruta de archivo
     * @param {string} code código de producto
     * @param {number} stock cantidad de productos disponibles
     */
    addProduct(title, description, price, thumbnail, codigo, stock){

        /**
         * guardo un boolean. Si alguno de los campos están vacíos da "false"
         */
        let isAllFields = (!!title && !!description && !!price && !!thumbnail && !!codigo && !!stock);
        
        if(!isAllFields){
            console.log("Todos los campos son obligatorios.");
            return;
        }

        let isCodeExist = false;
        isCodeExist = this.productos.some((element) => {
            return element.code === codigo;
        })

        if(isCodeExist) {
            console.log(`El código ${codigo} ingresado ya se encuentra en uso`);
            return;
        }        

        if(isAllFields && !isCodeExist){
            const product = {
                id: this.#nextId,
                title,
                description,
                price,
                thumbnail,
                code: codigo,
                stock
            };


            this.productos.push(product);
            this.#nextId++;

        }
        
        
    }

    /**
     * getProductById
     * @param {number} idNumber id del producto a encontrar
     * @returns {object}
     */
    getProductById(idNumber) {
        let findProduct = this.productos.find((element) => {
            return element.id === idNumber
        })

        if(findProduct) {
            console.log(findProduct);
            return findProduct;
            
        }else{
            console.log("Not found")
        }
    }

    getProducts() {
        console.log(this.productos);
    }
}

/* ------------------------------ 
          Verificación 
------------------------------ */

const productManager = new ProductManager();

productManager.addProduct("taza", "taza de cerámica con logo de pikachu", 4500, "taza-pikachu.jpg", "taza01", 4);

productManager.getProducts();

productManager.addProduct("taza harry potter", "taza de cerámica con logo de harry potter", 5000, "taza-harrypotter.jpg", "taza02", 2);

productManager.addProduct("taza picapiedras", "", 3500, "taza-pedropicapiedra.jpg", "taza02", 123123);

productManager.addProduct("taza picapiedras", "taza con dibujo de pedro picapiedras", 3500, "taza-pedropicapiedra.jpg", "taza02", 123123);

productManager.getProducts();

productManager.getProductById(1);
productManager.getProductById(3);

