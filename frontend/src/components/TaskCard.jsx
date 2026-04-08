import API from "../services/api";

const TaskCard = ({ task, refresh }) => {
  // ✅ Correct place for safety
  if (!task) return null;

  const handleComplete = async () => {
    try {
      await API.post("/tasks/complete", {
        taskId: task._id,
      });

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex justify-between items-start">
      
      <div>
        {/* Title */}
        <h3 className="font-semibold text-lg">{task.title}</h3>

        {/* Category */}
        <p className="text-sm text-gray-400 mb-1 capitalize">
          {task.category}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-2 line-clamp-2">
          {task.description}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleComplete}
        disabled={task.completed}
        className={`px-4 py-2 rounded shadow transition duration-200 ${
          task.completed
            ? "bg-green-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
        }`}
      >
        {task.completed ? "Done" : "Complete"}
      </button>

    </div>
  );
};

export default TaskCard;