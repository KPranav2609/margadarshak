import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

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

    let userTask = await UserTask.findOne({
      user: req.user._id,
      task: taskId,
    });

    if (!userTask) {
      userTask = await UserTask.create({
        user: req.user._id,
        task: taskId,
        completed: true,
      });
    } else {
      userTask.completed = true;
      await userTask.save();
    }

    res.json({ message: "Task completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};