import express from "express";
import env from "dotenv";
import { dbConnect } from "./config/db.js";
import pasteRoutes from "./routes/pasteRoute.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
env.config();

const app=express();
const port=process.env.PORT || 4000;


app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "https://paste-client.vercel.app","https://pasteclient.onrender.com","https://elaborate-marigold-94bf88.netlify.app","https://dancing-donut-f03689.netlify.app","https://createpaste.netlify.app/"];
app.use(cors({
    origin: allowedOrigins, // Allow requests from your frontend
    credentials: true, // Allow cookies and authentication headers
    // methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    // allowedHeaders: 'Content-Type,Authorization' // Allowed headers
}));
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("This is home page")
})
app.use('/api/v1/',pasteRoutes);
app.use('/api/v1/',authRoutes);

dbConnect();
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})