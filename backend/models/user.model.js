import mongoose,{ Schema } from "mongoose";


// Define the User schema
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
        required: true,
        unique: true, // Enforce unique Gmail addresses
        trim: true,
        validate: {
          validator: (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
          message: 'Invalid email format',
        },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
    required: true,
    default: 'buyer',
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Create the User model
export const User = mongoose.model("User",userSchema);
