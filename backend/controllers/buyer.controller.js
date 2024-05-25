import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import {Property} from "../models/property.model.js";
import { sendEmail } from "../utils/nodemailer.js";

const getAllProperty = async(req,res)=>{
    try {
        const user = req.user;
        const data = await Property.find({ owner: { $ne: user._id } }).populate({
            path: 'owner',
            select: '-password -role' // Exclude password and role fields
        });

        if(!data){
            throw new ApiError(500,"Something went wrong while Fetching the property"); 
        }
        
        res.status(200).json(new ApiResponse(200, data, "Properties fetched successfully"));
    } catch (error) {
        console.log(" server error while fetching property ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while fetching property")); 
    }
}

const sendMail = async(req,res)=>{
    try {
        console.log(req.body.propertyData);
        console.log(req.user);
        const emailContentforBuyer =`
        <p>Hello,</p>
        <p>You are interested in one of the property so i have send some details regarding this property please check the detail and contact the seller .</p>
        <h2> Property Dtails<h2>
       
        <ul>
          <li>Name: ${req.body.propertyData.name}</li>
          <li>place: ${req.body.propertyData.address}</li>
          <li>state: ${req.body.propertyData.state}</li>
          
        </ul>
        <h3>Owner Details:</h3>
        <ul>
          <li>First Name: ${req.body.propertyData.owner.firstname} ${req.body.propertyData.owner.lastname}</li>
          <li>Email: ${req.body.propertyData.owner.email}</li>
          <li>Phone: ${req.body.propertyData.owner.phone}</li>
          <!-- Add more data fields here as needed -->
        </ul>
        <h3>Thank you.</h3>
      `;
  
      const emailContentforSeller =`
        <p>Hello,</p>
        <p>Someone Interested in your proprty ${req.body.propertyData.name} please contact them .</p>
        <h3>Buyer Details:</h3>
        <ul>
          <li>Name: ${req.user.firstname} ${req.user.lastname}</li>
          <li>Email: ${req.user.email}</li>
          <li>Phone: ${req.user.phone}</li>
          
        </ul>
       
        <h3>Thank you.</h3>
      `;

      const ownerEmail = sendEmail(req.body.propertyData.owner.email, emailContentforSeller);
      if(!ownerEmail){
        throw new ApiError(500,"Something went wrong while Sending the mail to Seller");
      }

      const buyerEmail = sendEmail(req.user.email,emailContentforBuyer);
      if(!buyerEmail){
        throw new ApiError(500,"Something went wrong while Sending the mail to Buyer");
      }

      res.status(200).json(new ApiResponse(200, null, "Mail Send Successfully"));
    } catch (error) {
        console.log(" server error while sending mail ",error);
        res.status(500).json(new ApiResponse(500, null,"Some server error while sending mail")); 
    }
}

export {
    getAllProperty,
    sendMail,
}