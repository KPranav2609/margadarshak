import axios from "axios";
import systemPrompt from "../prompts/systemPrompt.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateAIResponse = async (prompt) => {
  try {
    if (!prompt?.trim()) {
      return "Invalid AI prompt.";
    }

    const models = [
<<<<<<< Updated upstream
      "z-ai/glm-4.5-air:free",
      "deepseek/deepseek-chat-v3-0324:free",
      "nvidia/nemotron-3-super-120b-a12b:free",
      "arcee-ai/trinity-large-preview:free",
      "openrouter/free",
=======
      "qwen/qwen3-coder-480b-a35b:free", // Best for coding & project understanding
      "qwen/qwen3.6-plus:free", // Excellent reasoning + general chat
      "nvidia/nemotron-3-super-120b-a12b:free", // Very reliable fallback
      "meta-llama/llama-4-maverick:free", // Strong general-purpose model (when available)
      "deepseek/deepseek-r1:free", // Great reasoning
      "openrouter/free", // Final automatic fallback
>>>>>>> Stashed changes
    ];

    for (const model of models) {
      try {
<<<<<<< Updated upstream
        console.log(`🧠 Trying model: ${model}`);
=======
        console.log(`Trying model: ${model}`);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          }
=======
          },
>>>>>>> Stashed changes
        );

        const content = response.data?.choices?.[0]?.message?.content?.trim();

        if (!content) {
<<<<<<< Updated upstream
          console.log(`⚠️ Empty response from ${model}. Trying next model...`);
          continue;
        }

        console.log(`✅ Response generated using: ${model}`);
        return content;

=======
          console.log(`Empty response from ${model}. Trying next model...`);
          continue;
        }

        console.log(`Response generated using: ${model}`);
        return content;
>>>>>>> Stashed changes
      } catch (err) {
        const code = err.response?.status;

        console.log(
<<<<<<< Updated upstream
          `❌ ${model} failed | Status: ${code || "Unknown"} | ${
            err.response?.data?.error?.message || err.message
          }`
=======
          `${model} failed | Status: ${code || "Unknown"} | ${
            err.response?.data?.error?.message || err.message
          }`,
>>>>>>> Stashed changes
        );

        await delay(code === 429 ? 1200 : 500);
      }
    }

    return "Sorry, I couldn't generate a response right now. Please try again in a few moments.";
<<<<<<< Updated upstream

  } catch (error) {
    console.error("🔥 AI Service Error:", error.message);
=======
  } catch (error) {
    console.error("AI Service Error:", error.message);
>>>>>>> Stashed changes

    return "Something went wrong while generating the AI response.";
  }
};
