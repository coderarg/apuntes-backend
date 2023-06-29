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
                return this.products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.cartspath)){
                const cartsJSON = await fs.promises.readFile(this.cartspath, 'utf-8');
                this.cartspath.splice(0, this.cartspath.length);
                this.cartspath.push(...JSON.parse(cartsJSON));
                return this.carts;
            }else{
                return this.carts;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(idNumber){
        try {
            await this.getCarts();

            const foundCart = this.carts.find((element) => {
                element.id == idNumber;
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
            
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(idCart, product) {
        try {
            await this.getCarts();
            await this.getProducts();
            
            const cartExist = this.carts.some(c => c.id === idCart);
            const productExist = this.products.some(p => p.id === product.id);

            if (!productExist) {
                console.log(`The product doesn't exist. Load it in productos.json`);
                return;
            }else{
                if(cartExist){
                    const cartIndex = this.carts.findIndex( c => c.id === idCart);
                    const prodInCartExist = this.carts[cartIndex].products.some( p => p.id = product.id);

                    if(prodInCartExist){
                        const prodInCartIndex = this.carts[cartIndex].products.findIndex( p => p.id = product.id);
                        
                        this.carts[cartIndex].products[prodInCartIndex].quantity ++;
                        await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
                    }else{
                        this.carts[cartIndex].products.push({id: product.id, quantity: 1});
                        await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
                    }
    
                }else{
                    
                    await this.getCarts();
                    this.carts.push({
                        id: await this.#getMaxId() + 1,
                        products: [
                            {
                                id: product.id,
                                quantity: 1
                            }   
                        ]
                    })

                    await fs.promises.writeFile(this.cartsPath, JSON.stringify(this.carts));
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    
}

/* const cartManager = new CartManager('./files/carritos.json', './files/productos.json');

const testManager = async () => {
    await cartManager.getCarts();
    await cartManager.addProductToCart(1, {
        id: 1,
    })
    await cartManager.addProductToCart(1, {
        id: 1,
    })
    await cartManager.addProductToCart(1, {
        id: 2,
    })
    await cartManager.addProductToCart(3, {
        id: 2,
    })
    await cartManager.getCarts();
};

testManager(); */