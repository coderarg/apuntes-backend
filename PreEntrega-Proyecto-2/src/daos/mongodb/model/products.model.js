import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: { type: Array }
})

ProductSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model('products', ProductSchema);