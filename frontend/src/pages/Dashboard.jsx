import { useEffect, useState } from "react";
import API from "../services/api";
import ProgressBar from "../components/ProgressBar";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard:", err.message);
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }

  // ⚠️ Safety Check
  if (!stats) {
    return null;
  }

  // ✅ Success UI
 return (
  <div className="min-h-screen bg-gray-900 text-white p-6">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

    {/* Top Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <StatCard title="Total Tasks" value={stats.total} />

  <StatCard
    title="Completed"
    value={stats.completed}
    color="text-green-400"
  />

  <StatCard
    title="Remaining"
    value={stats.remaining}
    color="text-red-400"
  />
</div>

    {/* Category Progress */}
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Category Progress</h2>

      <div className="space-y-4">
        <div>
          <p className="mb-1">Coding</p>
          <ProgressBar
            value={stats.categoryStats.coding.completed}
            total={stats.categoryStats.coding.total}
          />
        </div>

        <div>
          <p className="mb-1">Aptitude</p>
          <ProgressBar
            value={stats.categoryStats.aptitude.completed}
            total={stats.categoryStats.aptitude.total}
          />
        </div>

        <div>
          <p className="mb-1">Interview</p>
          <ProgressBar
            value={stats.categoryStats.interview.completed}
            total={stats.categoryStats.interview.total}
          />
        </div>
      </div>
    </div>
  </div>
);
};

export default Dashboard;