import { getMentorResponse } from "../services/aiService.js";
import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";

export const askMentor = async (req, res) => {
  try {
    const { question } = req.body;

    // Get stats (reuse logic)
    const tasks = await Task.find();
    const userTasks = await UserTask.find({
      user: req.user._id,
    });

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

      categoryStats[task.category].total++;

      if (isCompleted) {
        categoryStats[task.category].completed++;
      }
    });

    const userStats = {
      total,
      completed,
      categoryStats,
    };

    const aiResponse = await getMentorResponse(userStats, question);

    res.json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};