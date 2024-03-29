import UserDaoMongoDB from "../2-daos/mongodb/users.dao.js";
const userDao = new UserDaoMongoDB();
import fs from 'fs';
import {__dirname} from '../utils.js';


export const createFileUser = async () => {
  try {
    const usersFile = JSON.parse(fs.readFileSync(__dirname+'/data/Users.json', 'utf-8'));
    const newUsers = await userDao.createUser(usersFile);
    if(!newUsers) return false;
    else return { message: 'Successful uploading users!' }
  } catch (error) {
    console.log(error);
  }
}

export const getByNameUser = async (name) => {
  try {
    const item = await userDao.getUserByName(name);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdUser = async (id) => {
  try {
    const item = await userDao.getUserById(id);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmailUser = async (email) => {
  try {
    const item = await userDao.getUserByEmail(email);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (page, limit) => {
  try {
    const item = await userDao.getAllUsers(page, limit);
    if (!item) return false;
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (obj) => {
  try {
    const newUser = await userDao.createUser(obj);
    if (!newUser) throw new Error("Validation Error!");
    else return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, obj) => {
  try {
    let item = await userDao.getUserById(id);
    if (!item) {
      throw new Error("User not found!");
    } else {
      const userUpdated = await userDao.updateUser(id, obj);
      return userUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const userDeleted = await userDao.deleteUser(id);
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const aggregation = async() => {
  try {
    const aggregation = await userDao.aggregation();
    return aggregation;
  } catch (error) {
    console.log(error);
  }
}

export const updateManyAge = async() => {
  try {
    const response = await userDao.updateManyAge();
    return response;
  } catch (error) {
    console.log(error);
  }
}
