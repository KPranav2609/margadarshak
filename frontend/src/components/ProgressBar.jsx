import { ui } from "../styles/ui";

const ProgressBar = ({ value, total }) => {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-2 text-[var(--muted)]">
        <span>
          {value}/{total}
        </span>

        <span>{percent}%</span>
      </div>

      <div className={ui.progressBackground}>
        <div
          className={`${ui.progressFillFast} bg-gradient-to-r from-blue-500 to-blue-400`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;