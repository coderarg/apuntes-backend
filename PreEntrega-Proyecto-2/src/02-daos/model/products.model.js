import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: {type: String, required: true},
    code: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Boolean, required: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},

})

/*  

    - id = _id (tomo el id de mongo)
    - title:String,
    - description:String
    - code:String
    - price:Number
    - status:Boolean (true por defecto)
    - stock:Number
    - category:String
    - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto 

*/