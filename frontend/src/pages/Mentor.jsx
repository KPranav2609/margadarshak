import { useState } from "react";

import useMentor from "../hooks/useMentor";

import PageWrapper from "../components/PageWrapper";
import SkeletonCard from "../components/SkeletonCard";

import { ui } from "../styles/ui";

const Mentor = () => {
  const [question, setQuestion] = useState("");

  const { askMentor, response, loading } = useMentor();

  const quickPrompts = [
    "Explain Binary Search",
    "How do I prepare for DBMS interview?",
    "Explain JWT Authentication",
    "Top HR Interview Questions",
  ];

  const parseResponse = (text) => {
    const steps = {
      step1: "",
      step2: "",
      step3: "",
      tips: "",
    };

    if (!text) return steps;

    let currentSection = "";

    text.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const stepMatch = trimmed.match(/^step\s*([123])[:-]?\s*(.*)$/i);
      const tipsMatch = trimmed.match(/^tips[:-]?\s*(.*)$/i);

      if (stepMatch) {
        currentSection = `step${stepMatch[1]}`;
        steps[currentSection] = stepMatch[2];
        return;
      }

      if (tipsMatch) {
        currentSection = "tips";
        steps.tips = tipsMatch[1];
        return;
      }

      if (currentSection) {
        steps[currentSection] = `${steps[currentSection]} ${trimmed}`.trim();
      }
    });

    return steps;
  };

  const parsed = parseResponse(response);

  const handleAsk = () => {
    if (!question.trim()) return;

    askMentor(question);
    setQuestion("");
  };

  return (
    <PageWrapper>
      <div className={ui.chatContainer}>
        {/* Header */}

        <div className="mb-5">
          <h1 className={ui.pageTitle}>
            AI Mentor
          </h1>

          <p className={ui.pageSubtitle}>
            Ask anything and get step-by-step guidance 🚀
          </p>
        </div>

        {/* Quick Prompts */}

        <div className="flex flex-wrap gap-3 mb-5">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              className={ui.quickPrompt}
              onClick={() => setQuestion(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat */}

        <div className={ui.chatArea}>
          {!loading && !response && (
            <div className={ui.mentorWelcome}>
              👋 Welcome!

              <br />
              <br />

              Ask me anything about coding,
              interviews, aptitude or placement
              preparation.
            </div>
          )}

          {loading && (
            <>
              <SkeletonCard className="h-24 w-full" />
              <SkeletonCard className="h-24 w-5/6" />
              <SkeletonCard className="h-20 w-4/6" />
            </>
          )}

          {[parsed.step1, parsed.step2, parsed.step3].map(
            (step, index) =>
              step && (
                <div
                  key={index}
                  className={ui.mentorCard}
                >
                  <h3 className={ui.stepTitle}>
                    Step {index + 1}
                  </h3>

                  <p className="mt-2">
                    {step}
                  </p>
                </div>
              )
          )}

          {parsed.tips && (
            <div className={ui.tipsCard}>
              <h3 className={ui.tipsTitle}>
                💡 Tips
              </h3>

              <p className="mt-2">
                {parsed.tips}
              </p>
            </div>
          )}
        </div>

        {/* Input */}

        <div className="mt-5">
          <div className={ui.glassInput}>
            <textarea
              rows="1"
              value={question}
              placeholder="Ask your doubt..."
              className={ui.textarea}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAsk();
                }
              }}
            />

            <button
              onClick={handleAsk}
              disabled={loading}
              className={`${ui.askButton} ${
                loading
                  ? ui.askButtonLoading
                  : ui.askButtonActive
              }`}
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Mentor;
