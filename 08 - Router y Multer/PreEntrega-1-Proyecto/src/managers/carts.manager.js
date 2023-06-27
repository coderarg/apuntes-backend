import fs from 'fs';

export default class CartManager {
    constructor(path){
        this.carts = [];
        this.path = path;
    }
    #maxId = 0;

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

    async getCarts() {
        try {
            if(fs.existsSync(this.path)){
                const cartsJSON = await fs.promises.readFile(this.path, 'utf-8');
                this.path.splice(0, this.path.length)
                this.path.push(...JSON.parse(cartsJSON))
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
            const carts = await this.getCarts();

            


        } catch (error) {
            
        }
    }
    
}