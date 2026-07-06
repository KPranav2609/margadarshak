import { getUserContext } from "../services/contextService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const context = await getUserContext(req.user._id);

    res.json({
      total: context.totalTasks,
      completed: context.completedTasks,
      remaining: context.remainingTasks,
      totalXP: context.totalXP,
      overallProgress: context.overallProgress,
      categoryStats: context.categoryStats,
      nextTask: context.nextTask,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};