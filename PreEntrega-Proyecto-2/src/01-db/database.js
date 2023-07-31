import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/ecommerce?retryWrites=true&w=majority'

const localConnectionString = 'mongodb://127.0.0.1:27017/ecommerce'

try {
    await mongoose.connect(localConnectionString);
    console.log(`Conectado a Atlas DB Ecommerce`);
} catch (error) {
    console.log(error);
}