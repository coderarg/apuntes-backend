import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/ecommerce';

try {
    await mongoose.connect(connectionString)
    console.log(`Conectado a MongoDB`);
} catch (error) {
    console.log(error);
}