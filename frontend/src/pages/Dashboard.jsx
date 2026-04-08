import { useEffect, useState } from "react";
import API from "../services/api";
import XPCard from "../components/XPCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard:", error.message);
      setStats(null); // safety
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ FIX: prevent crash when stats is null
  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <h2 className="text-lg">Total Tasks</h2>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <h2 className="text-lg">Completed</h2>
          <p className="text-2xl font-bold text-green-400">
            {stats.completed}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <h2 className="text-lg">Remaining</h2>
          <p className="text-2xl font-bold text-red-400">
            {stats.remaining}
          </p>
        </div>
      </div>

      {/* XP System */}
      <div className="mt-6">
        <XPCard completed={stats.completed} />
      </div>

      {/* Category Progress */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats.categoryStats).map(([key, value]) => {
          const percent = value.total
            ? (value.completed / value.total) * 100
            : 0;

          return (
            <div
              key={key}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h2 className="text-lg capitalize mb-2">{key}</h2>

              <p className="text-sm text-gray-400 mb-2">
                {value.completed} / {value.total} completed
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 h-2 rounded overflow-hidden">
                <div
                  className="bg-green-500 h-2 rounded transition-all duration-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;