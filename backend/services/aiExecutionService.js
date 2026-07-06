import { getUserContext } from "./contextService.js";
import { generateAIResponse } from "./aiService.js";

export const executeAIFeature = async ({
  userId,
  promptBuilder,
  featureName,
  promptData,
}) => {
  // Build personalized context
  const context = await getUserContext(userId);

  // Build prompt
  const prompt = promptBuilder(context, promptData);

  // Generate AI response
  const response = await generateAIResponse(prompt);

  return {
    success: true,
    feature: featureName,
    response,
  };
};