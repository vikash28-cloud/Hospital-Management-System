import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv";
const userSchema = new mongoose.Schema({
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
    nic:{
        type:String,
        required:true,
        minLength:[13,"NIC must contain exact 13 digits"],
        minLength:[13,"NIC must contain exact 13 digits"],
        
    },
    dob:{
        type:Date,
        
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    password:{
        type:String,
        minLength:[8,"password must contain at least 8 characters "],
        required:true,
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Patient","Doctor"],
    },
    DoctorDepartment:{
        type:String
    },
    docAvtar:{
        public_id:String,
        url:String
    },
})

// password first hashed then saved in db
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}

export const User = mongoose.model("User",userSchema);