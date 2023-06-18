import fs from 'fs';

/**
 * ProductManager: Clase
 * @param {string} path diracción donde se guarda el archivo
 */
export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path
    }
    #newId = 1;

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

    async addProduct(newProduct) {

        try {
            await this.getProducts();
            
            let isAllFields = (!!newProduct.title && !!newProduct.description && !!newProduct.price && !!newProduct.thumbnail && !!newProduct.code && !!newProduct.stock);

            if (!isAllFields) {
                console.log("All fields are requiered");
                return;
            }
       
            let isCodeExist = this.products.some((element) => {
                return element.code === newProduct.code;
            });

            if (isCodeExist) {
                console.log("Error: Product code already exist");
                return;
            }

            if (isAllFields && !isCodeExist) {
                const product = {id: this.#newId, ...newProduct}

                this.products.push(product);
                this.#newId++;
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
                    await this.saveProducts(this.products);
            
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
                await this.saveProducts(this.products);
                
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

/* const productManager = new ProductManager('./productsFile.json');

const test = async()=>{
    
    await productManager.addProduct(
        {
            title: "Product 1",
            description: "Description 1",
            price: 100,
            thumbnail: './images/product1.jpg',
            code: '123456',
            stock: 10
        }
    );
    await productManager.addProduct(
        {
            title: "Product 2",
            description: "Description 2",
            price: 200,
            thumbnail: './images/product2.jpg',
            code: '3456789',
            stock: 20
        }
    );
    await productManager.addProduct(
        {
            title: "Product 3",
            description: "Description 3",
            price: 300,
            thumbnail: './images/product3.jpg',
            code: '938475',
            stock: 30
        }
    );

    await productManager.updateProduct(2, {title: 'modificado', code:'234567'});
    await productManager.updateProduct(3, {title: 'modifica3', code:'123654'});

    await productManager.deleteProduct(1);
}

test(); */