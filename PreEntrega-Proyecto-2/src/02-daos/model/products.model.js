import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: Array, required: true} //Opción 1
    //thumbnail: [] //Opción 2
})

export const ProductsModel = mongoose.model(
    'products',
    ProductSchema
)