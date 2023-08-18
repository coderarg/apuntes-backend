import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    full_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    password: { 
        type: String
    },
    rol: {
        type: String,
        default: 'user'
    },
    isGithub: {
        type: Boolean,
        default: false
    }
});

export const UserModel = model('users', userSchema);