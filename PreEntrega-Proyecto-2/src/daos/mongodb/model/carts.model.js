import { mongo } from 'mongoose';
import mongoose from 'mongose';

const CartSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            default: []
        }
    ]
})

export const CartModel = mongoose.model('carts', CartSchema);