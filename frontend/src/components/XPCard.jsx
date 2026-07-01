import { ui } from "../styles/ui";

const XPCard = ({ xp = 0 }) => {
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;
  const xpToNextLevel = 100 - progress;

  return (
    <div className={ui.xpCard}>
      <h2 className={ui.xpTitle}>Your Progress</h2>

      <p className={ui.xpLevel}>
        Level: <span className={ui.primaryText}>{level}</span>
      </p>

      <p className={ui.xpText}>
        XP: <span className={ui.xpBadge}>{xp}</span>
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-[var(--border)] h-3 rounded-full overflow-hidden">
        <div
          className={`${ui.progressFillFast} bg-gradient-to-r from-blue-500 to-blue-400 h-3`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className={ui.xpNext}>
        {xpToNextLevel === 100
          ? "Level complete! Keep going 🚀"
          : `${xpToNextLevel} XP to next level`}
      </p>
    </div>
  );
};

export default XPCard;