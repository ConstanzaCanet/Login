import mongoose from 'mongoose';

const collection = 'usarprueba';

const UserSchema= new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    username:{
        type:String,
        default:"anonymus",
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

export const users = mongoose.model(collection, UserSchema)