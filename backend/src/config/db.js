import mongoose from "mongoose";
import colors from "colors";
import { DB_NAME } from "../contants.js";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
//   } catch (error) {
//     console.error(`Error: ${error.message}`.red.bold);
//     process.exit(1); // Exit with a non-zero status code to indicate an error
//   }
// };

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
