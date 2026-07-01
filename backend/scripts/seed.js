import mongoose from "mongoose";
import dotenv from "dotenv";

import Task from "../models/Task.js";
import tasks from "../data/index.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Remove existing tasks
    await Task.deleteMany({});
    console.log("🗑️ Old tasks deleted");

    // Insert new tasks
    await Task.insertMany(tasks);
    console.log(`🎉 Successfully seeded ${tasks.length} tasks`);

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();