import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_URI}/${DB_NAME}`;
    console.log("Connecting to:", mongoURI);

    const connectResponse = await mongoose.connect(mongoURI);
    console.log(`Connected: ${connectResponse.connection.host}`);
  } catch (err) {
    console.log("Error occurred ", err);
    process.exit(1);
  }
};

export default connectDB;
