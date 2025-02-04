import mongoose from "mongoose";

const pasteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:String,
        required:true,
    }
})

export default mongoose.model("Paste",pasteSchema);