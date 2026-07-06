import { useState } from "react";

import useMentor from "../hooks/useMentor";

import PageWrapper from "../components/PageWrapper";

import AIFeatureTabs from "../components/mentor/AIFeatureTabs";
import FeatureHeader from "../components/mentor/FeatureHeader";
import MentorInput from "../components/mentor/MentorInput";
import MentorResponse from "../components/mentor/MentorResponse";

import styles from "./Mentor.module.css";

const Mentor = () => {
  const [selectedFeature, setSelectedFeature] = useState("placement");

  const [question, setQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");

  const [difficulty, setDifficulty] = useState("Easy");
  const [count, setCount] = useState(5);

  const [days, setDays] = useState(30);
  const [hoursPerDay, setHoursPerDay] = useState(3);

  const {
    placementCoach,
    studyPlanner,
    companyPreparation,
    revisionGenerator,
    practiceGenerator,
    response,
    loading,
  } = useMentor();

  const parseResponse = (text) => {
    const result = {
      step1: "",
      step2: "",
      step3: "",
      tips: "",
    };

    if (!text) return result;

    let current = "";

    text.split("\n").forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) return;

      const stepMatch = trimmed.match(/^step\s*([123])[:-]?\s*(.*)$/i);
      const tipsMatch = trimmed.match(/^tips[:-]?\s*(.*)$/i);

      if (stepMatch) {
        current = `step${stepMatch[1]}`;
        result[current] = stepMatch[2];
        return;
      }

      if (tipsMatch) {
        current = "tips";
        result.tips = tipsMatch[1];
        return;
      }

      if (current) {
        result[current] = `${result[current]} ${trimmed}`.trim();
      }
    });

    return result;
  };

  const parsed = parseResponse(response);

 const handleAsk = () => {
  switch (selectedFeature) {
    case "placement":
      if (!question.trim()) return;

      placementCoach({ question });
      break;

    case "study":
      if (!question.trim()) return;

      studyPlanner({
        question: `${question.trim()} Prepare this for ${Number(
          days
        )} days with ${Number(hoursPerDay)} hours per day.`,
      });
      break;

    case "company":
      if (!company.trim()) return;

      companyPreparation({
        company,
        question:
          question.trim() ||
          `Create a focused preparation strategy for ${company}.`,
      });
      break;

    case "revision":
      if (!topic.trim()) return;

      revisionGenerator({
        topic,
        question:
          question.trim() ||
          `Create concise interview revision notes for ${topic}.`,
      });
      break;

    case "practice":
      if (!topic.trim()) return;

      practiceGenerator({
        topic,
        difficulty,
        count: Number(count),
        question:
          question.trim() ||
          `Generate ${Number(count)} ${difficulty} interview practice questions for ${topic}.`,
      });
      break;

    default:
      return;
  }

  setQuestion("");
};

  return (
    <PageWrapper>
      <div className={styles.container}>
        {/* Page Header */}

        <div className={styles.header}>
          <h1 className={styles.title}>🤖 AI Placement Assistant</h1>

          <p className={styles.subtitle}>
            Personalized AI tools powered by your placement progress.
          </p>
        </div>

        {/* Feature Tabs */}

        <AIFeatureTabs
          selectedFeature={selectedFeature}
          onSelect={setSelectedFeature}
        />

        {/* Feature Information */}

        <FeatureHeader feature={selectedFeature} />

        {/* Dynamic Input */}

        <MentorInput
          selectedFeature={selectedFeature}
          question={question}
          setQuestion={setQuestion}
          company={company}
          setCompany={setCompany}
          topic={topic}
          setTopic={setTopic}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          count={count}
          setCount={setCount}
          days={days}
          setDays={setDays}
          hoursPerDay={hoursPerDay}
          setHoursPerDay={setHoursPerDay}
          loading={loading}
          handleAsk={handleAsk}
        />

        {/* AI Response */}

        <MentorResponse loading={loading} response={response} parsed={parsed} />
      </div>
    </PageWrapper>
  );
};

export default Mentor;
