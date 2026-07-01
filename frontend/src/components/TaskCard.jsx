import { ui } from "../styles/ui";
import toast from "react-hot-toast";
const difficultyColor = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
};

const TaskCard = ({ task, onComplete }) => {
  if (!task) return null;

  const openProblem = () => {
    // Coding tasks → open coding platform
    if (task.category === "coding") {
      let url = "";

      switch (task.platform) {
        case "leetcode":
          url = `https://leetcode.com/problems/${task.slug}/`;
          break;

        case "gfg":
          url = `https://www.geeksforgeeks.org/problems/${task.slug}/`;
          break;

        case "hackerrank":
          url = `https://www.hackerrank.com/challenges/${task.slug}/problem`;
          break;

        default:
          toast.error("Problem link not found.");
          return;
      }

      window.open(url, "_blank");
      return;
    }

    // Aptitude & Interview → V2 placeholder
    toast(
      "🚀 AI Mentor support for Aptitude & Interview will be available in V2.",
    );
  };
  return (
    <div className={ui.taskCard}>
      {/* Top */}
      <div className="flex justify-between items-center">
        <span
          className={`font-semibold capitalize ${
            difficultyColor[task.difficulty]
          }`}
        >
          {task.difficulty}
        </span>

        <span className={ui.xpBadge}>⭐ {task.xp} XP</span>
      </div>

      {/* Title */}
      <h3
        className={`${ui.taskTitle} ${
          task.completed
            ? "line-through text-[var(--muted)]"
            : "hover:text-[var(--primary)]"
        }`}
      >
        {task.title}
      </h3>

      {/* Topic */}
      <p className={ui.taskTopic}>📚 {task.topic}</p>

      {/* Description */}
      <p className={ui.taskDescription}>{task.description}</p>

      {/* Time */}
      <div className={ui.taskMeta}>
        <span>⏱</span>
        <span>{task.estimatedTime}</span>
      </div>

      {/* Companies */}
      {task.companyTags?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
            Asked In
          </p>

          <div className="flex flex-wrap gap-2">
            {task.companyTags.map((company) => (
              <span key={company} className={ui.companyBadge}>
                {company}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openProblem();
          }}
          className={ui.solveButton}
        >
          Solve Problem
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          disabled={task.completed}
          className={task.completed ? ui.completedButton : ui.completeButton}
        >
          {task.completed ? "✓ Completed" : "Mark Complete"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
