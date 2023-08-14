import { connect } from 'mongoose';

export const localString = 'mongodb://127.0.0.1:27017/ecommerce';

export const connectionString = 'mongodb+srv://lucasgarciadeveloper:admin@coderhouseproject.bjwfjs8.mongodb.net/ecommerce?retryWrites=true&w=majority';

try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB!');
} catch (error) {
    console.log(error);
};