import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, require: true }
    description
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
    - thumbnails:Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto */