import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

export const getUserContext = async (userId) => {
  const tasks = await Task.find();

  const userTasks = await UserTask.find({
    user: userId,
  });

  // Map completed tasks
  const taskMap = userTasks.reduce((acc, ut) => {
    acc[ut.task.toString()] = ut.completed;
    return acc;
  }, {});

  let completedTasks = 0;
  let totalXP = 0;

  const categoryStats = {
    coding: { total: 0, completed: 0 },
    aptitude: { total: 0, completed: 0 },
    interview: { total: 0, completed: 0 },
  };

  let nextTask = null;

  tasks.forEach((task) => {
    const isCompleted = taskMap[task._id.toString()] || false;

    categoryStats[task.category].total++;

    if (isCompleted) {
      completedTasks++;
      totalXP += task.xp || 0;
      categoryStats[task.category].completed++;
    } else if (!nextTask) {
      nextTask = task;
    }
  });

  const totalTasks = tasks.length;
  const remainingTasks = totalTasks - completedTasks;

  const overallProgress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  // ---------- Weakest Area ----------
  let weakestArea = null;
  let strongestArea = null;

  let lowest = Infinity;
  let highest = -1;

  Object.entries(categoryStats).forEach(([category, stats]) => {
    const ratio =
      stats.total === 0 ? 0 : stats.completed / stats.total;

    if (ratio < lowest) {
      lowest = ratio;
      weakestArea = category;
    }

    if (ratio > highest) {
      highest = ratio;
      strongestArea = category;
    }
  });

  return {
    totalTasks,
    completedTasks,
    remainingTasks,
    totalXP,
    overallProgress,

    categoryStats,

    weakestArea,
    strongestArea,

    nextTask: nextTask
      ? {
          id: nextTask._id,
          title: nextTask.title,
          topic: nextTask.topic,
          category: nextTask.category,
          estimatedTime: nextTask.estimatedTime,
          xp: nextTask.xp,
        }
      : null,
  };
};