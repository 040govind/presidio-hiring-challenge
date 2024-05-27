import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {Property} from "../models/property.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const addProperty = async(req,res)=>{
    try {
        // console.log(req.body);
        // console.log(req.user);
        // console.log(req.file);
        const {name,description,noOfBadroom,noOfBathroom,nearByHospital,address,city,state,country,price} = req.body;
        const user= req.user;
        if(
            [name,description,address,city,state,country,price].some((field)=> field?.trim() === "")
        )
        {
            throw  new ApiError(400,"All fields are required");
        }
        
        const imageLocalPath = req?.file?.path;
        if(!imageLocalPath){
            throw new ApiError(401,"Image file is required");
        }
         
        const image= await uploadOnCloudinary(imageLocalPath,"journal_degree");
        
    
        if(!image)
        {
            
            throw new ApiError(401,"Image file is required");
        }

        const data = Property.create({
            name,
            description,
            noOfBadroom,
            noOfBathroom,
            nearByHospital,
            address,
            city,
            state,
            country,
            image:image.url,
            owner:user._id,
            price
        });

        if(!data){
            throw new ApiError(500,"Something went wrong while Adding the property");
        }

        return res.status(200).json(
            new ApiResponse(200,null, "Property Added  Successfully")
        )
    } catch (error) {
        console.log(" server error while adding property ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while adding property"));
    }
}

const fetchProperty = async(req,res)=>{
    try {
        //console.log(req.user);
        const user =req.user;
        const data = await Property.find({owner:user._id});

        if(!data){
            throw new ApiError(500,"Something went wrong while Fetching the property"); 
        }
        return res.status(200).json(
            new ApiResponse(200,data, "Property Fetched  Successfully")
        );

    } catch (error) {
        console.log(" server error while fetching property ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while fetching property")); 
    }
}

const deleteProperty = async(req,res)=>{
    try {
        const id = req.params.id;

        const response = await Property.findByIdAndDelete({_id:id});
        if(!response){
            throw new ApiError(500,"Something went wrong while Deleting the property");  
        }
        
        return res.status(200).json(
            new ApiResponse(200,null, "Property Deleted Successfully")
        );

    } catch (error) {
        console.log(" server error while deleting  property ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while deleting property")); 
    }
}

const updateProperty = async(req,res)=>{
    try {
        console.log(req.body);
        const updatedProperty = await Property.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if(!updateProperty){
            throw new ApiError(500,"Something went wrong while Updating the property");  
        }
        return res.status(200).json(
            new ApiResponse(200,null, "Property update Successfully")
        );
    } catch (error) {
        console.log(" server error while updating  property ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while updating property"));  
    }
}
export{
    addProperty,
    fetchProperty,
    deleteProperty,
    updateProperty
}