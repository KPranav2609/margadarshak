import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="text-white p-6">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      <div className="space-y-4">
        {tasks
          .filter((task) => task && task._id) // ✅ SAFETY FILTER
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              refresh={fetchTasks}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskPage;