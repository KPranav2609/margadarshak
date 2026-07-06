import styles from "./FeatureHeader.module.css";

const featureData = {
  placement: {
    icon: "📈",
    title: "Placement Coach",
    description:
      "Get personalized placement guidance based on your learning progress.",
  },

  study: {
    icon: "📅",
    title: "Study Planner",
    description:
      "Generate a realistic study plan tailored to your available time.",
  },

  company: {
    icon: "🏢",
    title: "Company Preparation",
    description:
      "Prepare strategically for your dream company with focused guidance.",
  },

  revision: {
    icon: "📖",
    title: "Revision Generator",
    description:
      "Generate concise revision notes before interviews and assessments.",
  },

  practice: {
    icon: "❓",
    title: "Practice Generator",
    description:
      "Generate personalized interview and coding practice questions.",
  },
};

const FeatureHeader = ({ feature }) => {
  const current = featureData[feature];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.icon}>{current.icon}</span>

        <h2 className={styles.title}>{current.title}</h2>
      </div>

      <p className={styles.description}>{current.description}</p>

      <hr className={styles.divider} />
    </div>
  );
};

export default FeatureHeader;