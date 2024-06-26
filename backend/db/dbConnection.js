import {mongoose} from "mongoose";
//import {DB_NAME} from "../constant.js";

const connectionDb = async()=>{
    try {
        
        const connectionInstance =await mongoose.connect(`${process.env.MONGODB_URI}/presidioProperty`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb Connection Failed",error);
        process.exit(1);
    }
}

export default  connectionDb;