import { UserModel } from "./models/user.model.js";

export default class UserDao {
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.findOne({ email });
            if(!existUser) {
                if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
                    return await UserModel.create({...user, rol: 'admin'});
                }
                return await UserModel.create(user);
            } else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async loginUser(user) {
        try {
            const { email, password } = user;
            const userExist = await UserModel.findOne({ email: email, password: password });
            if(userExist) return userExist;
            else return false;
        } catch (error) {
            console.log(error);
        }
    };

    async getByEmail(user) {
        try {
            const userExist = await UserModel.findOne({ email: user.email})
            if(!userExist) return false
            else return userExist; 
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id);
            if(!userExist) return false
            else return userExist; 
        } catch (error) {
            console.log(error);
        }

    }
}