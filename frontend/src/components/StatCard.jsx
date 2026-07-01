import { ui } from "../styles/ui";

const StatCard = ({ title, value, color = "" }) => {
  return (
    <div className={`${ui.statCard} ${ui.hoverCardLarge}`}>
      <h2 className={ui.muted}>
        {title}
      </h2>

      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;