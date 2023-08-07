import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/ecommerce?retryWrites=true&w=majority';
const localConnection = 'mongodb://127.0.0.1:27017/ecommerce'

try {
  await mongoose.connect(localConnection);
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(`ERROR => ${error}`);
}