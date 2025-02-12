import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
             return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        var encryptedPassword="";
        try{
                encryptedPassword =await bcrypt.hash(password,10);
                console.log(encryptedPassword);
        }catch(err){
            console.log(err);
            return  res.status(400).json({
                success:false,
                message:"encryption error",
            })
        }

        try {
            const createUser=await User.create({
                name,email,password:encryptedPassword
            })
            res.status(200).json({
                success:true,
                message:"user created successfully.. "
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"error in db registration"
            })
        }


    } catch (error) {

        res.status(500).json({
            success:false,
            message:"error occurred.."
        })

    }




}

export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        var existUser=await User.findOne({email});
        if(!existUser){
            return res.status(400).json({
                success:false,
                message:"You haven't registered yet...",
                exist:false,

            })
        }
        const pass= await bcrypt.compare(password,existUser.password);
        // console.log(pass);
        var payload={
            id:existUser._id,
            name:existUser.name,
            email:existUser.email,
            role:existUser.role
        }
        try{
            if(pass){
                // create jwt token (payload-data,secretkey,optional)
                console.log("creating jwt token")
                const token=jwt.sign(payload,"secretVivek",{
                    expiresIn:"2h"
                });
                // console.log(existUser)
    
                existUser=existUser.toObject();
                // add token to existUser
                existUser.token=token;
                // console.log(existUser);
                // remove password from existUser
                existUser.password=undefined;
                // console.log(existUser);
    
    
                // create cookie
    
                const options={
                    expires:new Date(Date.now() + 3*12*60*60*1000),
                    httpOnly:true,
                    
                }
                // 
                res.cookie("loginCookie",token,options).status(200).json({
                    success:true,
                    token:token,    
                    user:existUser,
                    message:"login succesfull..."
                })
            }
            console.log("created cookie")
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Wrong password"
            });
        }
        
        

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err,
        });
    }


}

