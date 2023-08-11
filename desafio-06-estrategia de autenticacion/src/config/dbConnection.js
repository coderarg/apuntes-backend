import { connect } from 'mongoose';

export const connectionString = 'mongodb://127.0.0.1:27017/ecommerce';

try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB!');
} catch (error) {
    console.log(error);
};