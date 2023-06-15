import fs from 'fs';

export default class UserManager{
    constructor(path){
        this.path = path;
    }

    async createUser(obj){
        try {
            const user = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const usersFile = await this.getUsers();
            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId(){
        let maxId = 0;
        const users = await this.getUsers();
        users.map((user) => {
            if (user.id > maxId) maxId = user.id;
        })
        return maxId;
    }

    async getUsers(){
        try {
            if(fs.existsSync(this.path)){
                const users = await fs.promises.readFile(this.path, 'utf8');
                const userJS = JSON.parse(users);
                return userJS;
            }else{
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUserById(id){
        try {
            const usersFile = await this.getUsers();
            const user = usersFile.find((u) => u.id === id);
            user ? user : false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(obj, id) {
        try {
            const usersFile = await this.getUsers();
            const index = usersFile.findIndex(u => u.id === id);
            if(index === -1){
                throw new Error('Id not found');
            } else {
                usersFile[index] = {...obj, id}
            }
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(id){
        try {
            const usersFile = await this.getUsers();
            if(usersFile.length > 0){
                const newArray = usersFile.filter((user) => {
                    return user.id !== id;
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            }else{
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
        }
    }

    
}