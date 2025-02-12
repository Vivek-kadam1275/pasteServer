
import Paste from "../models/pasteModel.js";

export const addPaste=async (req,res)=>{
    try {
        const {title,content}=req.body; 
        const userId=req.body.user;
        const response=await Paste.create({
            title,content,createdAt:new Date().toDateString(),userId
        })

        console.log(response);
        return res.status(200).json({
            success:true,
            message:"paste created successfully",
            data:response,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while inserting in db",
        })
    }

}

export const updatePaste=async (req,res)=>{
    try {
        const {id}=req.params;
        const {title,content}=req.body;
        const response=await Paste.findByIdAndUpdate(id,{title,content,createdAt:new Date().toDateString()},{ new: true });
        res.status(200)
        .json({
            success:true,
            message:"updated successfully",
            data:response,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while updating in db",
        })
    }

}

export const deletePaste=async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteOne=await Paste.findByIdAndDelete(id);
        res.status(200)
        .json({
            success:true,
            message:"Deleted successfully",
            
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while deleting in db",
        })
    }
}
export const getPaste=async(req,res)=>{
    try {
        const {id}=req.params;
        const response=await Paste.findById(id);
        res.status(200)
        .json({
            success:true,
            message:"fetched successfully",
            data:response
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while fetching paste from db",
        })
    }

}

export const getPastes=async(req,res)=>{
    try {
        const userId=req.body.user;
        console.log(userId);
        const response=await Paste.find({userId});
        res.status(200)
        .json({
            success:true,
            message:"fetched successfully",
            data:response
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error while fetching pastes from db",
        })
    }

}