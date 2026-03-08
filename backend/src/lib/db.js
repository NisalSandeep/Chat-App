import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("mongodb connected successfully", conn.connection.host);
    }catch(error) {
        console.log("Error Connecting to the MongoDB" , error);
        process.exit(1); // 1  is fail , 0 is success
    }
}


export default connectDB;