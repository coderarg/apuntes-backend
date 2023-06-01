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
    addProduct(title, description, price, thumbnail, code, stock){

        const product = {
            id: this.#nextId, // variable privada de la clase que se autoincrementa automáticamente después de cargar un producto.
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        /**
         * guardo un boolean. Si alguno de los campos están vacíos da "false"
         */
        let verifyFields = (!title || !description || !price || !thumbnail || !code || !stock);
        if(verifyFields){
            console.error("Todos los campos son obligatorios.")
        }

        /**
         * guardo un boolean. Si da true el codigo ingresado ya se encuentra cargado.
         */
        let verifyCode = this.productos.some((element) => {
            element.code === code;
        })
        if(verifyCode) {
            console.error(`El código ${code} ingresado ya se encuentra en uso`)
        }

        if(verifyFields && !verifyCode){
            this.#nextId++;
            this.productos.push(product);
        }
    }


}
