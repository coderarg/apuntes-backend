import { initMongoDB } from "./01-conexion.js";
import { UserModel } from "./02-schema.js";

const user = {
    first_name: 'Matias',
    last_name: 'Merlo',
    age: 37
}

// Método Create
const createUser = async (obj) =>{
    await UserModel.create(obj);
}

const test = async() => {
    await initMongoDB();

    // Método create
    await UserModel.create(user);
    
    // Método findById
    const findByIdMethod = await UserModel.findById('6466b1de59553c6548dedb54')
    console.log(findByIdMethod);

    // Método find
    const findMethod = await UserModel.find({});
    console.log(findMethod);

    // Método findByIdAndUpdate
    await initMongoDB();
    const update1 = await UserModel.findByIdAndUpdate(
        '64af47ed5523b83fdeb51f25',
        { admin: true },
        { new: true }
        )
    console.log(update1);

    // Método findByIdAndDelete
    const delete1 = await UserModel.findByIdAndDelete('64af47ed5523b83fdeb51f25');
    console.log(delete1);
}

test()