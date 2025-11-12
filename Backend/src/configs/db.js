import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to Database Succesfully");
    }
    catch(error){
        console.error("Error connecting to mongodb", error);
        process.exit(1);
    }
}