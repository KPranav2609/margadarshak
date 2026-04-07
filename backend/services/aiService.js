import axios from "axios";

export const getMentorResponse = async (userStats, userQuery) => {
  try {
    // 🔹 Detect weakest category
    const categories = Object.keys(userStats.categoryStats || {});
    if (categories.length === 0) throw new Error("No categories found");

    let weakest = categories[0];

    categories.forEach((cat) => {
      if (
        userStats.categoryStats[cat].completed /
          (userStats.categoryStats[cat].total || 1) <
        userStats.categoryStats[weakest].completed /
          (userStats.categoryStats[weakest].total || 1)
      ) {
        weakest = cat;
      }
    });

    // 🔹 Prompt
    const prompt = `
You are an AI mentor for placement preparation.

User Progress:
- Total Tasks: ${userStats.total}
- Completed: ${userStats.completed}

Weak Area: ${weakest}

User Question: ${userQuery}

Respond STRICTLY in this format.
Keep answers short and actionable. Do NOT use markdown.

Step 1:
Step 2:
Step 3:
Tips:
`;

    // 🔥 Fallback models (YOUR MODELS)
    const models = [
      "google/gemma-3-27b-it:free",
      "meta-llama/llama-3.3-70b-instruct:free"
    ];

    let finalResponse = null;

    for (let model of models) {
      try {
        console.log("Trying model:", model);

        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 300,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:5000",
              "X-Title": "MargaDarshak",
            },
            timeout: 10000,
          }
        );

        finalResponse = response.data?.choices?.[0]?.message?.content;

        console.log("Success with:", model);
        break;

      } catch (err) {
        console.log("Failed model:", model);
        console.log("Reason:", err.response?.data || err.message);
      }
    }

    // 🔴 If all models fail
    if (!finalResponse) {
      return "AI mentor is currently busy. Please try again shortly.";
    }

    return finalResponse;

  } catch (error) {
    console.error("FINAL ERROR:", error.message);
    throw new Error(error.message);
  }
};