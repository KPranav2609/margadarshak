import styles from "./MentorInput.module.css";

const MentorInput = ({
  selectedFeature,

  question,
  setQuestion,

  company,
  setCompany,

  topic,
  setTopic,

  difficulty,
  setDifficulty,

  count,
  setCount,

  days,
  setDays,

  hoursPerDay,
  setHoursPerDay,

  loading,
  handleAsk,
}) => {
  return (
    <div className={styles.wrapper}>
      {/* Placement Coach */}

      {selectedFeature === "placement" && (
        <div className={styles.card}>
          <textarea
            rows={4}
            value={question}
            placeholder="Ask anything about placements, interviews or preparation..."
            className={styles.textarea}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleAsk}
              disabled={loading}
              className={styles.button}
            >
              {loading ? "Generating..." : "Ask Coach"}
            </button>
          </div>
        </div>
      )}

      {/* Study Planner */}

      {selectedFeature === "study" && (
        <div className={styles.card}>
          <div className={styles.twoColumnGrid}>
            <input
              type="number"
              value={days}
              min="1"
              placeholder="Number of Days"
              className={styles.input}
              onChange={(e) => setDays(e.target.value)}
            />

            <input
              type="number"
              value={hoursPerDay}
              min="1"
              placeholder="Hours Per Day"
              className={styles.input}
              onChange={(e) => setHoursPerDay(e.target.value)}
            />
          </div>

          <textarea
            rows={4}
            value={question}
            placeholder="Describe your study goal..."
            className={styles.textarea}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleAsk}
              className={styles.button}
            >
              Generate Plan
            </button>
          </div>
        </div>
      )}

      {/* Company Preparation */}

      {selectedFeature === "company" && (
        <div className={styles.card}>
          <input
            value={company}
            placeholder="Company Name"
            className={styles.input}
            onChange={(e) => setCompany(e.target.value)}
          />

          <textarea
            rows={4}
            value={question}
            placeholder="Ask anything about this company..."
            className={styles.textarea}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleAsk}
              className={styles.button}
            >
              Generate Strategy
            </button>
          </div>
        </div>
      )}

      {/* Revision */}

      {selectedFeature === "revision" && (
        <div className={styles.card}>
          <input
            value={topic}
            placeholder="Topic"
            className={styles.input}
            onChange={(e) => setTopic(e.target.value)}
          />

          <textarea
            rows={4}
            value={question}
            placeholder="What do you want to revise?"
            className={styles.textarea}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleAsk}
              className={styles.button}
            >
              Generate Notes
            </button>
          </div>
        </div>
      )}

      {/* Practice */}

      {selectedFeature === "practice" && (
        <div className={styles.card}>
          <div className={styles.threeColumnGrid}>
            <input
              value={topic}
              placeholder="Topic"
              className={styles.input}
              onChange={(e) => setTopic(e.target.value)}
            />

            <select
              value={difficulty}
              className={styles.input}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <input
              type="number"
              value={count}
              min="1"
              className={styles.input}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>

          <textarea
            rows={4}
            value={question}
            placeholder="Generate interview practice questions..."
            className={styles.textarea}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className={styles.buttonRow}>
            <button
              onClick={handleAsk}
              className={styles.button}
            >
              Generate Questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorInput;