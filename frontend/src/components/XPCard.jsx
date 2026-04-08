const XPCard = ({ completed }) => {
  const xp = completed * 10;
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
      
      <h2 className="text-xl font-semibold mb-4 tracking-wide">
        Your Progress
      </h2>

      <p className="text-lg font-medium">Level: {level}</p>
      <p className="text-sm text-gray-400 mb-3">XP: {xp}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-3 rounded overflow-hidden">
        <div
          className="bg-blue-500 h-3 rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {progress}/100 XP to next level
      </p>
    </div>
  );
};

export default XPCard;