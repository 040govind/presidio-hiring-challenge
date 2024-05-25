import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";

const Register = async(req,res)=>{
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            phone,
            role
          } = req.body;

          const existingUser = await User.findOne({ email });

          if (existingUser) {
            return res.status(401).json(new ApiResponse(401, null, "Email Allready exist"));
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phone,
            role
          });
      
          // Save the user to the database
          await newUser.save();
      
          res.status(200).json(new ApiResponse(200, null, "Registration successful"));
    } catch (error) {
        console.log(" server error while register ",error);
        res.status(500).json(new ApiResponse(500, null,"Some error occurred while registering the user"));
    }
}

const Login = async(req,res)=>{
    try {
        const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json(new ApiResponse(401, null, "Email or Password Invalid"));
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json(new ApiResponse(401, null, "Email or Password Invalid"));
    }

    // Generate JWT token
    const token = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    //console.log(token);

    // Send token in response
    res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
    } catch (error) {
        console.log(" server error while login ",error);
        res.status(500).json(new ApiResponse(500, null,"Some error occurred while Login the user"));
    }
}
export {
    Register,
    Login
}