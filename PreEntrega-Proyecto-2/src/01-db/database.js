import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/ecommerce?retryWrites=true&w=majority'

export const initMongoDB = async()=>{
    try {
        await mongoose.connect(connectionString);
        console.log(`Conectado a Atlas DB Ecommerce`);
    } catch (error) {
        console.log(error);
    }
}