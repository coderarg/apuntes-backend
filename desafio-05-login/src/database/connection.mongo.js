import mongoose from 'mongoose';

export const connectionString = 'mongodb://127.0.0.1:27017/coderhouse';

try {
    await mongoose.connect(connectionString);
    console.log('🔌 Connected to MongoDB');
} catch (error) {
    console.log(error);
}