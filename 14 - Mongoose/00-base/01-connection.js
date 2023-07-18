import mongoose from 'mongoose';

//const connectionString = 'mongodb://localhost/coderhouse';

const connectionString = 'mongodb+srv://lucasgarciadeveloper:lucasgarciadeveloper@cluster0.69pyxtr.mongodb.net/?retryWrites=true&w=majority';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('Conectado a MongoDB!');
    } catch (error) {
        console.log(error);
    }
}