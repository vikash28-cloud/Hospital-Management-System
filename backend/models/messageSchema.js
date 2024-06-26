import mongoose, { Schema } from "mongoose";
import validator from "validator";
const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please provide  a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[11,"phone number must contain exact 11 digits"],
        maxLength:[11,"phone number must contain exact 11 digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[10,"message must contain at least 10 digits"],
        
    },
   
})

export const Message = mongoose.model("Message",messageSchema);