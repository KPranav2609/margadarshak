import { useEffect, useState } from "react";
import API from "../services/api";

const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { stats, loading, refetch: fetchDashboard };
};

export default useDashboard;