import styles from "./AIFeatureTabs.module.css";

const features = [
  {
    id: "placement",
    icon: "📈",
    title: "Placement Coach",
  },
  {
    id: "study",
    icon: "📅",
    title: "Study Planner",
  },
  {
    id: "company",
    icon: "🏢",
    title: "Company Prep",
  },
  {
    id: "revision",
    icon: "📖",
    title: "Revision",
  },
  {
    id: "practice",
    icon: "❓",
    title: "Practice",
  },
];

const AIFeatureTabs = ({ selectedFeature, onSelect }) => {
  return (
    <div className={styles.wrapper}>
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onSelect(feature.id)}
          className={`${styles.tab} ${
            selectedFeature === feature.id ? styles.active : ""
          }`}
        >
          <span className={styles.icon}>{feature.icon}</span>

          <span>{feature.title}</span>
        </button>
      ))}
    </div>
  );
};

export default AIFeatureTabs;