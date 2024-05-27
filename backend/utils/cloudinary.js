import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

//ye clodinary ka congigration he 

cloudinary.config({ 
  cloud_name:"dc6tczoju", 
  api_key: 194667882311387, 
  api_secret: "DNc-a9L9f3z4FO5ggTrgcVMNR34" 
});

const uploadOnCloudinary = async (fileBuffer, targetFolder) => {
  try {
    if (!fileBuffer) return null;

    // Convert the file buffer to a Base64-encoded string
    const fileDataUrl = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

    // Upload the file directly to Cloudinary
    const response = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "image", // Adjust the resource type as needed
      folder: targetFolder
    });

    //console.log("File uploaded successfully:", response.url);
    return response;
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error);
    return null;
  }
};

export { uploadOnCloudinary };