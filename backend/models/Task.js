import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["coding", "aptitude", "interview"],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    topic: {
      type: String,
      required: true,
    },

    estimatedTime: {
      type: String,
      default: "30 mins",
    },

    xp: {
      type: Number,
      default: 10,
    },

    companyTags: [
      {
        type: String,
      },
    ],

    platform: {
      type: String,
      default: "leetcode",
    },

    slug: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Task", taskSchema);
