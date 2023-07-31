import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/ecommerce?retryWrites=true&w=majority';

  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
