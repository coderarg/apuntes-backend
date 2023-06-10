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
        try {
            const productsJS = await this.getProducts();
            isCodeExist = productsJS.some((element) => {
                return element.code === insertedCode;
            })
        } catch (error) {
            console.log(error);
        }

        if(isCodeExist) {
            console.log(`Code number ${insertedCode} is used`);
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
                const productsJSON = JSON.stringify(productsJS);
                await fs.promises.writeFile(this.path, productsJSON);
                this.#nextId++;
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getProductById(idNumber) {

        try {
            const productsJS = await this.getProducts();
            let foundProduct = productsJS.find((element) => {
                return element.id === idNumber
            })
            if(foundProduct) {
                console.log(foundProduct);
                return foundProduct;
            }else{
                console.log("Not found")
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(idNumber, key, value ){
        try {
            const productsJS = await this.getProducts();
            const index = productsJS.findIndex((element) => element.id === idNumber);
                productsJS[index][key] = value;

            await fs.promises.writeFile(this.path, JSON.stringify(productsJS));

        } catch (error) {
            console.log(error);
        }
    }
}

/* ------------------------------ 
          Verificación 
------------------------------ */

const manager = new ProductManager('./products.json');

manager.addProduct('producto1', 'producto1', 5000, './recursos/imagen-producto1.png', '111111', 5);

/* manager.addProduct('producto2', 'producto2', 6000, './recursos/imagen-producto2.png', '222222', 5);

manager.addProduct('producto3', 'producto3', 7000, './recursos/imagen-producto3.png', '333333', 5); */

manager.updateProduct(5, {id: 77, price: 5000});
manager.updateProduct(1, 'price', 5000);
