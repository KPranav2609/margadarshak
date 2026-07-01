import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import mongoose from "mongoose";

// @desc Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    const userTasks = await UserTask.find({
      user: req.user._id,
    });

    // Map completion status
    const taskMap = userTasks.reduce((acc, ut) => {
      acc[ut.task.toString()] = ut.completed;
      return acc;
    }, {});

    const result = tasks.map((task) => ({
      ...task._doc,
      completed: taskMap[task._id] || false,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Mark task as completed
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(taskId).select("_id");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await UserTask.findOneAndUpdate(
      {
        user: req.user._id,
        task: taskId,
      },
      {
        $set: {
          completed: true,
        },
        $setOnInsert: {
          completedAt: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    res.json({ message: "Task completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
