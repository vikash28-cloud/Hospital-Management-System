import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Hospital_Management_System"
    }).then(()=>{
        console.log("connected to db")
    }).catch((err)=>{
        console.log("some error occurs", err);
    })
}