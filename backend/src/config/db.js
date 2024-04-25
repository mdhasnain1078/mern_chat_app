import mongoose from "mongoose";
import colors from "colors";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
  console.log(`OK`);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
        .cyan.underline
    );
  } catch (error) {
    console.log("MONGODB connection FAILED: ", error);
    process.exit(1);
  }
};

export default connectDB;
