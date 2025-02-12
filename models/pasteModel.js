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
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
})

export default mongoose.model("Paste",pasteSchema);