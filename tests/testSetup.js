import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";
import Task from "../src/models/Task.js";

dotenv.config();

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Clean up test data
  await User.deleteMany({});
  await Task.deleteMany({});
}, 20000);

afterAll(async () => {
  // Clean up after tests
  await User.deleteMany({});
  await Task.deleteMany({});
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
});
