import express from "express"
import {config} from "dotenv";

const app = express();

config({path:"./backend/config/config.env"})

app.get("/",(req,res)=>{
    res.send("hello world")
})





app.listen(process.env.PORT,()=>{
    console.log(`app is listening on http://localhost:${process.env.PORT}`)
})