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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            }
                
        } catch (error) {
            console.log(error);
        }
    }

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

    async deleteProduct(idNumber) {
        try {
            await this.getProducts();

            if(this.products.some(element => element.id === idNumber)){
                let index = this.products.findIndex((element) => {
                    return element.id === idNumber;
                });
            
                this.products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                return;
            }else{
                console.log("Error: Product does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveProducts(elements){
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager('./productsFile.json');

const test = async()=>{
    await productManager.addProduct('Product 1', 'Description 1', 100, './images/product1.jpg', '123456', 10);
    await productManager.addProduct('Product 2', 'Description 2', 200, './images/product2.jpg', '679012', 20);
    await productManager.addProduct('Product 3', 'Description 3', 300, './images/product3.jpg', '234567', 30);

    await productManager.updateProduct(2, {title: 'modificado', code:'234567'});
    await productManager.updateProduct(3, {title: 'modifica3', code:'123654'});

    await productManager.deleteProduct(1);
}

test();