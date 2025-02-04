import express from "express";
import env from "dotenv";
import { dbConnect } from "./config/db.js";
import pasteRoutes from "./routes/pasteRoute.js";
import cors from "cors";
env.config();

const app=express();
const port=process.env.PORT || 4000;

dbConnect();
app.use(cors({
    origin:'*',
}))
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("This is home page")
})
app.use('/api/v1/',pasteRoutes);
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})