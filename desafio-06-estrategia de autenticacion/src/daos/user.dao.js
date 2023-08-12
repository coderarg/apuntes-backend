import { createHash, isValidPassword } from "../utils.js";
import { UserModel } from "./models/user.model.js";

export default class UserDao {
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.findOne({ email });
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    return await UserModel.create({
                        ...user, 
                        password: createHash(password),
                        rol: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email });
            const isValidPass = isValidPassword(password, userExist)
            if(!isValidPass)  return false;
            else return userExist;
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id){
        try {
            const userExist = await UserModel.findById(id)
            if(userExist) return userExist
            else return false
        } catch (error) {
            console.log(error)
            // throw new Error(error)
        }
    }

    async getByEmail(email){
    try {
        const userExist = await UserModel.findOne({email}); 
        // console.log(userExist);
        if(userExist) return userExist
        else return false
    } catch (error) {
        console.log(error);
    }
    }
}