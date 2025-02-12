import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {

    try {
        // fetch token from request body
        const token = req.cookies.loginCookie;
        

        console.log("into auth middleware")
        // console.log("body" ,req.body.token);
        console.log("cookie",req.cookies.loginCookie);
        // console.log("header",req.header("Authorization"));

        //check whether token exist or not
        if (!token) {
            return res.status(500).json({
                success: false,
                message: "token expired..."
            });
        }

        // convert that token into information
        try {
            const payload = jwt.verify(token, "secretVivek");
            console.log(payload);

            req.body.user = payload.id;
        } catch (error) {
            
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }


        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "couldn't go to test route"
        })
    }

}