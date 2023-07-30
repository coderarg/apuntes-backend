import fs from 'fs';

export default class CartManager {
    constructor(cartsPath, productsPath){
        this.carts = [],
        this.products = [],
        this.cartsPath = cartsPath,
        this.productsPath = productsPath
    }
    
    #maxId = 0;
    async #getMaxId() {
        try {
            await this.getCarts();

            this.carts.forEach((element) => {
                if(element.id > this.#maxId){
                    this.#maxId = element.id;
                }
            })
            return this.#maxId;
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.productsPath)) {
                const productsJSON = await fs.promises.readFile(this.productsPath, 'utf-8');
                this.products.splice(0, this.products.length);
                this.products.push(...JSON.parse(productsJSON));
                return this.products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.cartsPath)){
                const cartsJSON = await fs.promises.readFile(this.cartsPath, 'utf-8');
                this.carts.splice(0, this.carts.length);
                this.carts.push(...JSON.parse(cartsJSON));
                return this.carts;
            }else{
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idNumber){
        try {
            await this.getCarts();

            const foundCart = this.carts.find((element) => {
                return element.id == idNumber;
            })

            return foundCart;
        } catch (error) {
            console.log(error);
        }
    }

    async addCart() {
        try {
            await this.getCarts();
            const newCart = {
                id: await this.#getMaxId() + 1,
                products: []
            }

            this.carts.push(newCart);
            await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, idProduct) {
        try {
            await this.getCarts();
            await this.getProducts();
            
            const isProdInJSON = this.products.some(p => p.id === idProduct); //true or false
            const cartIndex = this.carts.findIndex(c => c.id === idCart); // -1 or index
            
            if(isProdInJSON) {
                if(cartIndex > -1) {
                    const indexProdInCart = this.carts[cartIndex].products.findIndex(p => p.id === idProduct);
                    if(indexProdInCart > -1 ) {
                        this.carts[cartIndex].products[indexProdInCart].quantity += 1;
                        await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));

                    }else{
                        this.carts[cartIndex].products.push({id: idProduct, quantity: 1});
                        await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
                    }
                }else{
                    this.carts.push({
                        id: idCart,
                        products: [
                            {
                                id: idProduct,
                                quantity: 1
                            }
                        ]
                    }) 
                    await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
                }
            }else{
                console.log(`Product with id: ${idProduct} does not exist`);
            }

        }catch(error){
            console.log(error);
        }
    }
    
}