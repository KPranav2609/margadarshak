import axios from "axios";
import systemPrompt from "../prompts/systemPrompt.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateAIResponse = async (prompt) => {
  try {
    if (!prompt?.trim()) {
      return "Invalid AI prompt.";
    }

    const models = [
      "qwen/qwen3-coder-480b-a35b:free",
      "qwen/qwen3.6-plus:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "meta-llama/llama-4-maverick:free",
      "deepseek/deepseek-r1:free",
      "openrouter/free",
    ];

    for (const model of models) {
      try {
        console.log(`Trying model: ${model}`);

        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 700,
            temperature: 0.3,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:5000",
              "X-Title": "MargaDarshak",
            },
            timeout: 10000,
          }
        );

        const content = response.data?.choices?.[0]?.message?.content?.trim();

        if (!content) {
          console.log(`Empty response from ${model}. Trying next model...`);
          continue;
        }

        console.log(`Response generated using: ${model}`);
        return content;
      } catch (err) {
        const code = err.response?.status;

        console.log(
          `${model} failed | Status: ${code || "Unknown"} | ${
            err.response?.data?.error?.message || err.message
          }`
        );

        await delay(code === 429 ? 1200 : 500);
      }
    }

    return "Sorry, I couldn't generate a response right now. Please try again in a few moments.";
  } catch (error) {
    console.error("AI Service Error:", error.message);
    return "Something went wrong while generating the AI response.";
  }
};
