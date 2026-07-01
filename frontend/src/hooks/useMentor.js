import { useState } from "react";
import API from "../services/api";

const useMentor = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const askMentor = async (question) => {
    if (!question.trim() || loading) return;

    try {
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

  return { askMentor, response, loading };
};

export default useMentor;