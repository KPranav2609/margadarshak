import API from "./api";

export const askPlacementCoach = async (payload) => {
  const { data } = await API.post("/ai/placement-coach", payload);
  return data;
};

export const askStudyPlanner = async (payload) => {
  const { data } = await API.post("/ai/study-planner", payload);
  return data;
};

export const askCompanyPreparation = async (payload) => {
  const { data } = await API.post("/ai/company-prep", payload);
  return data;
};

export const askRevision = async (payload) => {
  const { data } = await API.post("/ai/revision", payload);
  return data;
};

export const askPractice = async (payload) => {
  const { data } = await API.post("/ai/practice", payload);
  return data;
};
