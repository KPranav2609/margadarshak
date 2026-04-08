import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getMentorResponse = async (userStats, userQuery) => {
  try {
    if (!userQuery?.trim()) {
      return "Please enter a valid question.";
    }

    // 🔹 Detect weakest category
    const categories = Object.keys(userStats.categoryStats || {});
    if (categories.length === 0) throw new Error("No categories found");

    let weakest = categories[0];

    categories.forEach((cat) => {
      const currentRatio =
        userStats.categoryStats[cat].completed /
        (userStats.categoryStats[cat].total || 1);

      const weakestRatio =
        userStats.categoryStats[weakest].completed /
        (userStats.categoryStats[weakest].total || 1);

      if (currentRatio < weakestRatio) {
        weakest = cat;
      }
    });

    // 🔹 Stronger prompt (VERY IMPORTANT)
    const prompt = `
You are a strict placement mentor.

User stats:
- Total: ${userStats.total}
- Completed: ${userStats.completed}
- Weak area: ${weakest}

User question:
${userQuery}

Rules:
- Give ONLY 3 steps + tips
- Each step must be short (1 line)
- No explanations
- No markdown

Format:
Step 1:
Step 2:
Step 3:
Tips:
`;

    // 🔥 Model list (optimized order)
    const models = [
  "stepfun/step-3.5-flash:free",           // ⚡ fastest (may expire soon)
  "z-ai/glm-4.5-air:free",                 // 🧠 best structured
  "arcee-ai/trinity-large-preview:free",   // 🎯 mentor style
  "nvidia/nemotron-3-super-120b-a12b:free",// 🔥 strong reasoning
  "openrouter/free"                        // 🧠 auto fallback (IMPORTANT)
];

    let finalResponse = null;

    for (let model of models) {
      try {
        console.log("🧠 Trying:", model);

        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,
            messages: [{ role: "user", content: prompt }],
            max_tokens: 180,
            temperature: 0.5,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:5000",
              "X-Title": "MargaDarshak",
            },
            timeout: 7000,
          }
        );

        const content = response.data?.choices?.[0]?.message?.content;

        // 🔥 Strong validation
        if (
          content &&
          content.includes("Step 1") &&
          content.includes("Step 2") &&
          content.includes("Step 3")
        ) {
          console.log("✅ Success:", model);
          finalResponse = content.trim();
          break;
        }

      } catch (err) {
        const code = err.response?.status;

        console.log(`❌ ${model} failed (${code || "no code"})`);

        if (code === 429) {
          await delay(1200);
        } else {
          await delay(500);
        }
      }
    }

    // 🔴 FINAL FALLBACK (clean + structured)
    if (!finalResponse) {
      console.log("⚠️ Using fallback response");

      return `Step 1: Focus on your weakest area (${weakest})
Step 2: Practice 2-3 problems daily
Step 3: Review mistakes and improve weak concepts

Tips:
Stay consistent and track your progress daily.`;
    }

    return finalResponse;

  } catch (error) {
    console.error("🔥 Mentor Error:", error.message);

    return `Step 1: Revise fundamentals
Step 2: Practice regularly
Step 3: Track your mistakes

Tips:
Consistency is key to improvement.`;
  }
};