import mongoose from "mongoose";
import env from "dotenv";

env.config();

export const dbConnect=()=>{

    mongoose.connect(process.env.mongodbUrl).then(()=>{
        console.log("DB connected successfully");
    }).catch((err)=>{
        console.log("error occured in db connection", err);
    })
}