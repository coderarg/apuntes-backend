import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();


export const registerUser = async(user) => {
    try {
        const newUser = await userDao.registerUser(user)
        if(!newUser) throw new Error("Error creating new user")
        else return newUser;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async(user) => {
    try {
        const userLogOk = await userDao.loginUser(user);
        if(userLogOk) return true
        else return false
    } catch (error) {
        console.log(error);
    }
}

export const getById = async(id)=>{
    try {
        const userById = await userDao.getById(id);
        if(!userById) throw new Error('User not found')
        else return userById;
    } catch (error) {
        console.log(error);
    }
}

export const getByEmail = async(email)=>{
    try {
        const userByEmail = await userDao.getByEmail(email);
        if(!userByEmail) throw new Error('User not found')
        else return userById;
    } catch (error) {
        console.log(error)
    }
}