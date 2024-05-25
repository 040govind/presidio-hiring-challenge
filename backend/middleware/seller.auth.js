import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifySellerJWT = async(req, _, next) => {
    try {
        // const t=req.header("Authorization")?.replace("Bearer ", "");
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log(process.env.ACCESS_TOKEN_SECRET);
        //console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        //console.log("upar");
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log("neeche");
       // console.log(decodedToken);
        const user = await User.findById(decodedToken?.user?._id).select("-password ")
       
        if (!user) {
            
            throw new ApiError(401, "1 Invalid Access Token")
        }
        
        if (user.role !== 'seller') {
            
            throw new ApiError(401, " 2 Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401,"3 Invalid access token")
    }
    
}