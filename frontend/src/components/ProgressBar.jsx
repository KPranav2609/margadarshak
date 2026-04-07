const ProgressBar = ({ value, total }) => {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{value}/{total}</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full bg-gray-700 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;