const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-sm text-gray-400">{title}</h2>
      <p className={`text-2xl font-bold ${color || "text-white"}`}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;