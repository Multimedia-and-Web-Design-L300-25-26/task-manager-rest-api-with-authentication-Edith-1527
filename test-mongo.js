import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("Testing MongoDB Connection...");
console.log("URI:", process.env.MONGO_URI);

try {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log("✅ MongoDB connected successfully!");
  await mongoose.disconnect();
} catch (error) {
  console.error("❌ Connection failed:");
  console.error("Error:", error.message);
  console.error("Code:", error.code);
}
