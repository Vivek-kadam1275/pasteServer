import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser);
// Verify user 
router.get("/verify", (req, res) => {
    const token = req.cookies.loginCookie;
    console.log("verifying")
    console.log(token);
    if (!token) return res.status(401).json({ error: "Unauthorized", success: false });

    jwt.verify(token, "secretVivek", (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token expired", success: false });
        res.json({
            success: true,
            userId: decoded.id,
            authenticated: true
        });
    });
});

router.get("/logout", (req, res) => {
    try {
        console.log(req.cookies.loginCookie);
        res.clearCookie("loginCookie", { httpOnly: true, secure: true, sameSite: "None" });
        console.log(req.cookies.loginCookie);
        res.json({
            success: true,
            message: "Logged out",

        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "unable to logout",

        });
    }
});


// router.get("/test",auth,(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"you have successfully entered into test route"
//     })
// });




export default router;