/**
 * Manejo de Archivos
 * Consigna
 * Realizar una clase de nombre “ProductManager”, el cual permitirá trabajar con múltiples productos. Éste debe poder 
 * !agregar, 
 * !consultar, 
 * !modificar y 
 * !eliminar un producto y 
 * manejarlo en persistencia de archivos (basado en entregable 1).
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

/**
 * ProductManager: Clase
 * @param {string} path diracción donde se guarda el archivo
 */
class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
    }

    #maxId = 0;

    /**
     * getProductos: Método para cargar productos del archivo .json al array "this.products"
    */
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                this.products.splice(0, this.products.length);
                this.products.push(...JSON.parse(productsJSON));
                return this.products;
            } else {
                return this.products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * getProductById: Método para mostrar un producto por su id
     * @param {number} idNumber 
     * @returns {object} producto
     */
    async getProductById(idNumber) {
        try {
            let products = await this.getProducts();
            let foundProduct = products.find((element) => {
                return element.id === idNumber;
            });
            console.log(foundProduct);
            return foundProduct;
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * addProduct: Método para agregar un producto.
     * @param {string} title Título de producto
     * @param {string} description Descripción de producto
     * @param {number} price 
     * @param {string} thumbnail Ruta de imagen
     * @param {string} insertedCode Código de producto
     * @param {number} stock 
     * @returns {file} archivo .json
     */
    async addProduct(title, description, price, thumbnail, insertedCode, stock) {

        try {
            await this.getProducts();
            
            let isAllFields = (!!title && !!description && !!price && !!thumbnail && !!insertedCode && !!stock);

            if (!isAllFields) {
                console.log("All fields are requiered");
                return;
            }
       
            let isCodeExist = this.products.some((element) => {
                return element.code === insertedCode;
            });

            if (isCodeExist) {
                console.log("Error: Product code already exist");
                return;
            }

            if (isAllFields && !isCodeExist) {

                const product = {
                    id: await this.#getMaxId() + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code: insertedCode,
                    stock
                }

                this.products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
                
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * updateProduct: Método para modificar atributos de un producto
     * @param {number} idNumber id productogram
     * @param {object} updated atributos a modificar
     * @returns {file} archivo .json
     */
    async updateProduct(idNumber, updated) {
        try {
            await this.getProducts();
            
            let index = this.products.findIndex((element) => {
                return element.id === idNumber;
            });
            
            if(updated.code){
                let isCodeExist = false;
                isCodeExist = this.products.some((item) => item.code === updated.code);
                if (!isCodeExist) {
                    let modifiedProducts = {
                        ...this.products[index],
                        ...updated
                    }
                    this.products[index] = modifiedProducts;
                    this.saveProducts(this.products);
            
                } else {
                    console.log("Error: Product code already exist");
                    return;
                }
            } else {
                let modifiedProducts = {
                    ...this.products[index],
                    ...updated
                }
                this.products[index] = modifiedProducts;
                this.saveProducts(this.products);
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }     

    /**
     * deleteProduct: Método para elemintar un producto por su id
     * @param {number} idNumber id producto
     * @returns {file} archivo .json
     */
    async deleteProduct(idNumber) {
        try {
            await this.getProducts();

            if(this.products.some(element => element.id === idNumber)){
                let index = this.products.findIndex((element) => {
                    return element.id === idNumber;
                });
            
                this.products.splice(index, 1);
                await this.saveProducts(this.products)
                return;
            }else{
                console.log("Error: Product does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        try {
            await this.getProducts();

            this.products.forEach((element) => {
                if(element.id > this.#maxId){
                    this.#maxId = element.id
                }
            })
            return this.#maxId;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * saveProducts: Método para guardar los productos en archivo .json
     * @param {array} productos
     * @return {object} archivo .json 
     */
    async saveProducts(elements){
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}

/* ---------------------------------- 
                Test 
---------------------------------- */

const productManager = new ProductManager('./productsFile.json');

const test = async()=>{
    await productManager.addProduct('Product 1', 'Description 1', 100, './images/product1.jpg', '123456', 10);
    await productManager.addProduct('Product 2', 'Description 2', 200, './images/product2.jpg', '679012', 20);
    await productManager.addProduct('Product 3', 'Description 3', 300, './images/product3.jpg', '234567', 30);

    await productManager.updateProduct(2, {title: 'modifica3', code:'321123'});
    await productManager.updateProduct(3, {title: 'modifica4', code:'321321'});

    await productManager.deleteProduct(1);
}

test();