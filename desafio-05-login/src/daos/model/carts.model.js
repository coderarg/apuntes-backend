import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    products: [
        {   
            _id: false,
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'    
            },
            quantity: { type: Number, min: 0, default: 0 }
        }
    ]
})

export const CartsModel = mongoose.model('carts', CartSchema);