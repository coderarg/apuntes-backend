import fs from 'fs';

export default class ProductDaoFS{
    constructor(path) {
        this.products = [];
        this.path = path
    }
    #maxId = 0;

    async getAll() {
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

    async getById(idNumber) {
        try {
            let products = await this.getAll();
            let foundProduct = products.find((element) => {
                return element.id === idNumber;
            });
            return foundProduct;
        } catch (error) {
            console.log(error);
        }

    }

    async create(newProduct) {

        try {
            await this.getAll();
            
            const product = {
                id: await this.#getMaxId() + 1, 
                ...newProduct,
                status: true}

            this.products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async update(idNumber, updated) {
        try {
            await this.getAll();
            
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
                    return modifiedProducts;
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
                return modifiedProducts;
            }
            
        } catch (error) {
            console.log(error);
        }
    }     

    async delete(idNumber) {
        try {
            await this.getAll();

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
            await this.getAll();

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

    async saveProducts(elements){
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}
