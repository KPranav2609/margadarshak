import { ui } from "../styles/ui";

import useDashboard from "../hooks/useDashboard";
import { useNavigate } from "react-router-dom";
import XPCard from "../components/XPCard";
import StatCard from "../components/StatCard";
import SkeletonCard from "../components/SkeletonCard";

const Dashboard = () => {
  const { stats, loading } = useDashboard();
  const navigate = useNavigate();

  if (loading || !stats) {
    return (
      <div className="p-6 space-y-6">
        <SkeletonCard className="h-28 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-28" />
        </div>

        <SkeletonCard className="h-36 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard className="h-32" />
          <SkeletonCard className="h-32" />
          <SkeletonCard className="h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className={ui.page}>
      {/* Background */}
      <div className={ui.pageGlow}>
        <div className={ui.glowLeft} />
        <div className={ui.glowRight} />
      </div>

      <div className={ui.pageContent}>
        {/* Header */}

        <div className="animate-fadeIn">
          <h1 className={ui.pageTitle}>Dashboard</h1>

          <p className={ui.pageSubtitle}>
            Track your progress and stay consistent 🚀
          </p>
        </div>

        {/* Overall Progress */}

        <div className={`${ui.card} animate-slideUp`}>
          <div className="flex justify-between items-center mb-3">
            <h2 className={ui.cardTitle}>🎯 Overall Placement Progress</h2>

            <span className="text-2xl font-bold text-[var(--primary)]">
              {stats.overallProgress}%
            </span>
          </div>

          <div className={ui.progressBackgroundLarge}>
            <div
              className={`${ui.progressFill} ${
                stats.overallProgress >= 70
                  ? "bg-green-500"
                  : stats.overallProgress >= 40
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{
                width: `${stats.overallProgress}%`,
              }}
            />
          </div>

          <p className="text-sm text-[var(--muted)] mt-3">
            You've completed{" "}
            <span className="text-[var(--primary)] font-semibold">
              {stats.completed}
            </span>{" "}
            of{" "}
            <span className="text-[var(--primary)] font-semibold">
              {stats.total}
            </span>{" "}
            placement tasks.
          </p>
        </div>

        {/* Continue Learning */}

        {stats.nextTask && (
          <div className={ui.continueCard}>
            <h2 className="text-2xl font-semibold mb-4">
              📚 Continue Learning
            </h2>

            <h3 className="text-xl font-bold text-[var(--primary)]">
              {stats.nextTask.title}
            </h3>

            <p className="text-[var(--muted)] mt-2 capitalize">
              💻 {stats.nextTask.category}
            </p>

            <div className="flex gap-6 mt-4 text-sm text-[var(--muted)]">
              <span>⏱ {stats.nextTask.estimatedTime}</span>

              <span>⭐ +{stats.nextTask.xp} XP</span>
            </div>

            <button
              onClick={() => navigate("/tasks")}
              className={`${ui.btnPrimary} mt-5`}
            >
              Continue Learning →
            </button>
          </div>
        )}

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Tasks" value={stats.total} />

          <StatCard
            title="Completed"
            value={stats.completed}
            color="text-[var(--accent)]"
          />

          <StatCard
            title="Remaining"
            value={stats.remaining}
            color="text-[var(--danger)]"
          />
        </div>

        {/* XP */}

        <div className="animate-slideUp hover:shadow-2xl">
          <XPCard xp={stats.totalXP} />
        </div>
        {/* Category Progress */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(stats.categoryStats).map(([key, value]) => {
            const percent = value.total
              ? Math.round((value.completed / value.total) * 100)
              : 0;

            const progressColor =
              percent >= 70
                ? "bg-green-500"
                : percent >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500";

            const message =
              percent === 100
                ? "🎉 Category Completed!"
                : percent >= 70
                  ? "🔥 Almost There!"
                  : percent >= 40
                    ? "💪 Keep Going!"
                    : "🚀 Just Getting Started!";

            const icon =
              key === "coding" ? "💻" : key === "aptitude" ? "🧠" : "🎤";

            return (
              <div key={key} className={ui.categoryCard}>
                <div className="flex justify-between items-center mb-2">
                  <h2 className={ui.subTitle}>
                    {icon} {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>

                  <span className="font-bold text-[var(--primary)]">
                    {percent}%
                  </span>
                </div>

                <p className="text-sm text-[var(--muted)] mb-3">
                  {value.completed} of {value.total} completed
                </p>

                <div className={ui.progressBackground}>
                  <div
                    className={`${ui.progressFill} ${progressColor}`}
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-[var(--muted)] mt-3">{message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
