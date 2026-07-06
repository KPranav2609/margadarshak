import { useState } from "react";
import {
  askCompanyPreparation,
  askPlacementCoach,
  askPractice,
  askRevision,
  askStudyPlanner,
} from "../services/aiService";

const useMentor = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const submitMentorRequest = async (request) => {
    if (loading) return;

    try {
      setLoading(true);
      setResponse("");

      const data = await request();

      if (!data?.success) {
        setResponse(data?.message || "Something went wrong. Try again.");
        return;
      }

      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setResponse(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const placementCoach = (payload) =>
    submitMentorRequest(() => askPlacementCoach(payload));

  const studyPlanner = (payload) =>
    submitMentorRequest(() => askStudyPlanner(payload));

  const companyPreparation = (payload) =>
    submitMentorRequest(() => askCompanyPreparation(payload));

  const revisionGenerator = (payload) =>
    submitMentorRequest(() => askRevision(payload));

  const practiceGenerator = (payload) =>
    submitMentorRequest(() => askPractice(payload));

  return {
    placementCoach,
    studyPlanner,
    companyPreparation,
    revisionGenerator,
    practiceGenerator,
    response,
    loading,
  };
};

export default useMentor;
