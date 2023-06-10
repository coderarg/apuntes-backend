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

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
    }
    #newId = 1;

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

    async getProductsById(idNumber) {
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

    async addProduct(title, description, price, thumbnail, insertedCode, stock) {

        let isAllFields = (!!title && !!description && !!price && !!thumbnail && !!insertedCode && !!stock);

        if (!isAllFields) {
            console.log("All fields are requiered");
            return;
        }

        try {
            await this.getProducts();
        } catch (error) {
            console.log(error);
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
                id: this.#newId,
                title,
                description,
                price,
                thumbnail,
                code: insertedCode,
                stock
            }

            this.products.push(product);
            this.#newId++;

            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            } catch (error) {
                console.log(error);
            }
        }

    }

    async updateProduct(idNumber, updated) {
        try {
            await this.getProducts();
            let index = this.products.findIndex((element) => {
                return element.id === idNumber;
            });

            if(updated.code){
                if(this.products.some((product) => {
                    return product.code === updated.code
                })){
                    console.log("Error: Product code already exists");
                    return;
                }
            }

            let modifiedProducts = {
                ...this.products[index],
                ...updated
            }
            this.products[index] = modifiedProducts;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));

        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager('./productos.json');
productManager.getProducts();
//productManager.addProduct('', 'descripción 1', 100, './imagen1.png', 'A1111', 5);
productManager.addProduct('1', 'descripción 1', 100, './imagen1.png', 'A1111', 5);
productManager.addProduct('2', 'descripción 2', 200, './imagen2.png', 'A2222', 5);
//productManager.addProduct('producto 3', 'descripción 3', 300, './imagen3.png', 'A2222', 5);
productManager.addProduct('producto 3', 'descripción 3', 300, './imagen3.png', 'A3333', 5);
//productManager.getProductsById(1);
//productManager.getProductsById(3);
productManager.updateProduct(3, {title:'modificado', description: 'modificatres'});

