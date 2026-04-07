import API from "../services/api";

const TaskCard = ({ task, refresh }) => {
  const handleComplete = async () => {
    try {
      if (!task) return null;
      await API.post("/tasks/complete", {
        taskId: task._id,
      });

      refresh(); // reload tasks
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-start">
      <div>
        {/* Title */}
        <h3 className="font-semibold text-lg">{task.title}</h3>

        {/* Category */}
        <p className="text-sm text-gray-400 mb-1">{task.category}</p>

        {/* ✅ Description (NEW) */}
        <p className="text-sm text-gray-300 mt-2">{task.description}</p>
      </div>

      <button
        onClick={handleComplete}
        disabled={task.completed}
        className={`px-4 py-2 rounded ${
          task.completed
            ? "bg-green-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {task.completed ? "Done" : "Complete"}
      </button>
    </div>
  );
};

export default TaskCard;
