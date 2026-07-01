import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

export const getDashboardStats = async (req, res) => {
  try {
    const tasks = await Task.find();

    const userTasks = await UserTask.find({
      user: req.user._id,
    });

    // Map completed tasks
    const taskMap = userTasks.reduce((acc, ut) => {
      acc[ut.task.toString()] = ut.completed;
      return acc;
    }, {});

    let completed = 0;
    let totalXP = 0;

    const categoryStats = {
      coding: { total: 0, completed: 0 },
      aptitude: { total: 0, completed: 0 },
      interview: { total: 0, completed: 0 },
    };

    let nextTask = null;

    tasks.forEach((task) => {
      const isCompleted = taskMap[task._id.toString()] || false;

      // Category totals
      categoryStats[task.category].total++;

      if (isCompleted) {
        completed++;
        totalXP += task.xp || 0;
        categoryStats[task.category].completed++;
      } else if (!nextTask) {
        // First incomplete task
        nextTask = task;
      }
    });

    const total = tasks.length;
    const remaining = total - completed;

    const overallProgress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      remaining,
      totalXP,
      overallProgress,
      categoryStats,

      nextTask: nextTask
        ? {
            id: nextTask._id,
            title: nextTask.title,
            topic: nextTask.topic,
            estimatedTime: nextTask.estimatedTime,
            xp: nextTask.xp,
            category: nextTask.category,
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};