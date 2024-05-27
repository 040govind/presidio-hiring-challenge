import mongoose,{ Schema } from "mongoose";

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    noOfBadroom:{
        type:String,
        required:true

    },
    noOfBathroom:{
        type:String,
        required:true

    },
    nearByHospital:{
        type:String,
        required:true

    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String, // This could be an image URL or a reference to an image stored elsewhere
        required: true
    },
    // Assuming there's a reference to the user who owns this property
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Property = mongoose.model("Property",propertySchema);
