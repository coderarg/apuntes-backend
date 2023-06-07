/**
 * Manejo de Archivos
 * Consigna
 * Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder 
 * !agregar, 
 * !consultar, 
 * !modificar y 
 * !eliminar un producto y 
 * !manejarlo en persistencia de archivos (basado en entregable 1).
 * 
 * Aspectos a Incluir
 * La clase debe contar con una variable 
 * !this.path, el cual se inicializará desde el constructor 
 * y debe recibir la ruta a trabajar desde el momento de generar su instancia.
 * 
 * ?Debe guardar objetos con el siguiente formato
 * 
 * *id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
 * *title (nombre del producto)
 * *description (descripción del producto)
 * *price (precio)
 * *thumbnail (ruta de imagen)
 * *code (código identificador)
 * *stock (número de piezas disponibles)
 * 
 * Aspectos a incluir
 * *Debe tener un método addProduct
 * el cual debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recuerda siempre guardarlo como un array en el archivo).
 * *Debe tener un método getProducts, 
 * el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
 * *Debe tener un método getProductById, 
 * el cual debe recibir un id, y tras leer el archivo, debe buscar el producto con el id especificado y devolverlo en formato objeto
 * *Debe tener un método updateProduct, 
 * el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
 * *Debe tener un método deleteProduct, 
 * el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo. 
 */

const fs = require('fs');

class ProductManager {
    constructor(path){
        this.path = path;
    }
    #nextId = 1;
    
    /**
     * getProductos: Retora todos los productos del archivo en path
     * @returns {array<object} productos
     */
    async getProducts() {

        try {
            if(fs.existsSync(this.path)){
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(productsJSON);
                return productsJS;
            }else{
                return [];
            }
        } catch (error) {
            console.log("Error: we couldn't load file", error)
        }

    }


    /**addProduct:
     * Método que agrega productos al array "productos" y luego los guarda en un archivo JSON
     * @key {number} id se genera id autoincremental con this.nextId
     * @param {string} title titulo del producto
     * @param {string} description descripción del producto
     * @param {number} price precio
     * @param {string} thumbnail ruta de archivo
     * @param {string} insertedCode código de producto
     * @param {number} stock cantidad de productos disponibles
     */
    async addProduct(title, description, price, thumbnail, insertedCode, stock){

        let isAllFields = (!!title && !!description && !!price && !!thumbnail && !!insertedCode && !!stock);
        
        if(!isAllFields){
            console.log("All fields are necesary.");
            return;
        }

        let isCodeExist = false;
        isCodeExist = this.productos.some((element) => {
            return element.code === insertedCode;
        })

        if(isCodeExist) {
            console.log(`Code number ${insertedCode} doesn't exist`);
            return;
        }        

        if(isAllFields && !isCodeExist){
            const product = {
                id: this.#nextId,
                title,
                description,
                price,
                thumbnail,
                code: insertedCode,
                stock
            };

            try {
                const productsJS = await this.getProducts();
                productsJS.push(product);
                await fs.promises.writeFile(path, JSON.stringify(productsJS))
                return product
            } catch (error) {
                console.log(error);
            }

            this.#nextId++;
        }        
    }

    async getProductById(idNumber) {

        try {
            const productsJS = await this.getProducts();
            
        } catch (error) {
            
        }
        let findProduct = this.products.find((element) => {
            return element.id === idNumber
        })

        if(findProduct) {
            console.log(findProduct);
            return findProduct;
            
        }else{
            console.log("Not found")
        }
    }

    updateProduct(idNumber){

    }

    deleteProduct(idNumber){

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
