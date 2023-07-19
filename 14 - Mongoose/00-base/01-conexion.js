import mongoose from 'mongoose';

//const connectionString = 'mongodb://127.0.0.1:27017/coderhouse';
const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/coderhouse?retryWrites=true&w=majority';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Conectado a MongoDB!');
    } catch (error) {
        console.log(error);
    }
}