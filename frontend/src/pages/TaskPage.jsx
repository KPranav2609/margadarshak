import { useMemo, useState } from "react";

import { ui } from "../styles/ui";

import useTasks from "../hooks/useTasks";

import TaskCard from "../components/TaskCard";
import PageWrapper from "../components/PageWrapper";
import SkeletonCard from "../components/SkeletonCard";

const TaskPage = () => {
  const { tasks, loading, completeTask } = useTasks();

  const [company, setCompany] = useState("all");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");

  const topics = useMemo(
    () => [...new Set(tasks.map((task) => task.topic))],
    [tasks],
  );

  const companies = useMemo(
    () => [...new Set(tasks.flatMap((task) => task.companyTags || []))],
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "all" || task.difficulty === difficulty;

      const matchesTopic = topic === "all" || task.topic === topic;

      const matchesCompany =
        company === "all" || task.companyTags?.includes(company);

      return (
        matchesSearch && matchesDifficulty && matchesTopic && matchesCompany
      );
    });
  }, [tasks, search, difficulty, topic, company]);

  const groupedTasks = useMemo(() => {
    return filteredTasks.reduce((acc, task) => {
      if (!acc[task.topic]) acc[task.topic] = [];

      acc[task.topic].push(task);

      return acc;
    }, {});
  }, [filteredTasks]);

  const topicProgress = useMemo(() => {
    const progress = {};

    tasks.forEach((task) => {
      if (!progress[task.topic]) {
        progress[task.topic] = {
          total: 0,
          completed: 0,
        };
      }

      progress[task.topic].total++;

      if (task.completed) {
        progress[task.topic].completed++;
      }
    });

    return progress;
  }, [tasks]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <SkeletonCard className="h-16 w-full" />
          <SkeletonCard className="h-24 w-full" />

          <div className={ui.skeletonGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} className="h-48" />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Header */}

      <div className="animate-fadeIn">
        <h1 className={ui.pageTitle}>Placement Roadmap</h1>

        <p className={ui.pageSubtitle}>Complete tasks and gain XP 🚀</p>
      </div>

      {/* Filters */}

      <div className={ui.filterContainer}>
        <input
          type="text"
          placeholder="🔍 Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={ui.searchInput}
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className={ui.select}
        >
          <option value="all">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={ui.select}
        >
          <option value="all">All Topics</option>

          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>

        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={ui.select}
        >
          <option value="all">All Companies</option>

          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <button
          className={ui.clearButton}
          onClick={() => {
            setSearch("");
            setDifficulty("all");
            setTopic("all");
            setCompany("all");
          }}
        >
          Clear
        </button>
      </div>

      {/* Stats */}

      <div className="flex justify-between items-center">
        <p className={ui.muted}>
          Showing{" "}
          <span className="mx-1 text-blue-400 font-bold">
            {filteredTasks.length}
          </span>
          of{" "}
          <span className="mx-1 text-blue-400 font-bold">{tasks.length}</span>{" "}
          tasks
        </p>
      </div>

      {/* Empty */}

      {filteredTasks.length === 0 ? (
        <div className={ui.emptyState}>No matching tasks found.</div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedTasks).map(([topic, topicTasks]) => {
            const completed = topicProgress[topic].completed;
            const total = topicProgress[topic].total;

            const percent =
              total === 0 ? 0 : Math.round((completed / total) * 100);

            const progressColor =
              percent >= 70
                ? "bg-green-500"
                : percent >= 40
                  ? "bg-yellow-500"
                  : "bg-red-500";

            const motivation =
              percent === 100
                ? "🎉 Topic Completed!"
                : percent >= 70
                  ? "🔥 Almost There!"
                  : percent >= 40
                    ? "💪 Keep Going!"
                    : "🚀 Just Getting Started!";

            return (
              <div key={topic}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className={ui.topicTitle}>📚 {topic}</h2>

                    <p className={ui.topicCompleted}>
                      {completed} of {total} completed
                    </p>
                  </div>

                  <span className={ui.topicPercent}>{percent}%</span>
                </div>

                <div className={ui.progressBackground}>
                  <div
                    className={`${ui.progressFill} ${progressColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className={ui.topicMotivation}>{motivation}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onComplete={() => completeTask(task._id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
};

export default TaskPage;
