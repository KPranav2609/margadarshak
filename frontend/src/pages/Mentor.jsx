import { useState } from "react";
import API from "../services/api";

const Mentor = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Parse AI response
  const parseResponse = (text) => {
    const steps = {
      step1: "",
      step2: "",
      step3: "",
      tips: "",
    };

    if (!text) return steps;

    const lines = text.split("\n");

    lines.forEach((line) => {
      if (line.toLowerCase().startsWith("step 1")) {
        steps.step1 = line.replace(/step 1[:\-]?\s*/i, "");
      } else if (line.toLowerCase().startsWith("step 2")) {
        steps.step2 = line.replace(/step 2[:\-]?\s*/i, "");
      } else if (line.toLowerCase().startsWith("step 3")) {
        steps.step3 = line.replace(/step 3[:\-]?\s*/i, "");
      } else if (line.toLowerCase().startsWith("tips")) {
        steps.tips = line.replace(/tips[:\-]?\s*/i, "");
      }
    });

    return steps;
  };

  const askMentor = async () => {
    if (!question.trim() || loading) return;

    try {
      console.log("Calling mentor API...");

      setLoading(true);
      setResponse("");

      const { data } = await API.post("/ai/ask", {
        question,
      });

      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const parsed = parseResponse(response);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        AI Mentor
      </h1>

      {/* Input */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 mb-6">
        <textarea
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          rows="3"
          placeholder="Ask your doubt..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askMentor}
          disabled={loading}
          className={`mt-3 px-4 py-2 rounded shadow transition duration-200 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
          }`}
        >
          {loading ? "Thinking..." : "Ask Mentor"}
        </button>
      </div>

      {/* 🔥 Structured Response UI */}
      {response && (
        <div className="space-y-4">

          {/* Step Cards */}
          {[parsed.step1, parsed.step2, parsed.step3].map((step, i) => (
            step && (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                <h3 className="font-semibold text-blue-400">
                  Step {i + 1}
                </h3>
                <p className="text-gray-300 mt-1">{step}</p>
              </div>
            )
          ))}

          {/* Tips */}
          {parsed.tips && (
            <div className="bg-gray-800 p-4 rounded-xl border border-green-600 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              <h3 className="font-semibold text-green-400">Tips</h3>
              <p className="text-gray-300 mt-1">{parsed.tips}</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Mentor;