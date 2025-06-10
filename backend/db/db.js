import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error in DB connection:", err.message);
    // For debugging purposes, log the full error
    console.error(err);
    // Exit process with failure if connection is critical
    // process.exit(1); // Uncomment if you want the app to stop on DB connection failure
  }
}

export default connect;