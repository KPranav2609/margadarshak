import { executeAIFeature } from "../services/aiExecutionService.js";

import companyPrepPrompt from "../prompts/companyPrepPrompt.js";
import placementCoachPrompt from "../prompts/placementCoachPrompt.js";
import studyPlannerPrompt from "../prompts/studyPlannerPrompt.js";
import revisionPrompt from "../prompts/revisionPrompt.js";
import practicePrompt from "../prompts/practicePrompt.js";

// ===============================
// Placement Coach
// ===============================
export const placementCoach = async (req, res) => {
  try {
    const question = req.body.question?.trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const result = await executeAIFeature({
      userId: req.user._id,
      promptData: {
        question,
      },
      promptBuilder: placementCoachPrompt,
      featureName: "placement-coach",
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Placement Coach Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate placement guidance.",
    });
  }
};

// ===============================
// Study Planner
// ===============================
export const studyPlanner = async (req, res) => {
  try {
    const question = req.body.question?.trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const result = await executeAIFeature({
      userId: req.user._id,
      promptData: {
        question,
      },
      promptBuilder: studyPlannerPrompt,
      featureName: "study-planner",
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ Study Planner Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate study plan.",
    });
  }
};
// ===============================
// Company Preparation
// ===============================
export const companyPreparation = async (req, res) => {
  try {
    const { company, question } = req.body;

    if (!company?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company is required.",
      });
    }

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const result = await executeAIFeature({
      userId: req.user._id,
      promptBuilder: companyPrepPrompt,
      featureName: "company-prep",
      promptData: {
        company,
        question,
      },
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Company Preparation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate company preparation plan.",
    });
  }
};
// ===============================
// Revision Generator
// ===============================
export const revisionGenerator = async (req, res) => {
  try {
    const { topic, question } = req.body;

    if (!topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required.",
      });
    }

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const result = await executeAIFeature({
      userId: req.user._id,
      promptBuilder: revisionPrompt,
      featureName: "revision",
      promptData: {
        topic,
        question,
      },
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Revision Generator Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate revision notes.",
    });
  }
};
// ===============================
// Practice Question Generator
// ===============================
export const practiceGenerator = async (req, res) => {
  try {
    const { topic, difficulty, count, question } = req.body;

    if (!topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required.",
      });
    }

    if (!difficulty?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Difficulty is required.",
      });
    }

    if (!count) {
      return res.status(400).json({
        success: false,
        message: "Question count is required.",
      });
    }

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const result = await executeAIFeature({
      userId: req.user._id,
      promptBuilder: practicePrompt,
      featureName: "practice-generator",
      promptData: {
        topic,
        difficulty,
        count,
        question,
      },
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Practice Generator Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate practice questions.",
    });
  }
};