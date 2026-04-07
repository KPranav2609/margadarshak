import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

export const getDashboardStats = async (req, res) => {
  try {
    const tasks = await Task.find();
    const userTasks = await UserTask.find({
      user: req.user._id,
    });

    // Map user completion
    const taskMap = userTasks.reduce((acc, ut) => {
      acc[ut.task.toString()] = ut.completed;
      return acc;
    }, {});

    let total = tasks.length;
    let completed = 0;

    const categoryStats = {
      coding: { total: 0, completed: 0 },
      aptitude: { total: 0, completed: 0 },
      interview: { total: 0, completed: 0 },
    };

    tasks.forEach((task) => {
      const isCompleted = taskMap[task._id] || false;

      if (isCompleted) completed++;

      // Category stats
      categoryStats[task.category].total++;

      if (isCompleted) {
        categoryStats[task.category].completed++;
      }
    });

    const remaining = total - completed;

    res.json({
      total,
      completed,
      remaining,
      categoryStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};