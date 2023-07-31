import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    status: { type: Boolean },
    stock: { type: Number },
    category: { type: String },
    thumbnail: { type: String } //Opción 1
    //thumbnail: [] //Opción 2
})

export const ProductsModel = mongoose.model(
    'products',
    ProductSchema
)