import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks", err);
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    try {
      await API.post("/tasks/complete", { taskId });

      toast.success("🎉 Task completed! Keep it up!");

      await fetchTasks(); // Refresh tasks
    } catch (err) {
      console.error("Error completing task", err);
      toast.error("Failed to complete task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    completeTask,
    refetch: fetchTasks,
  };
};

export default useTasks;