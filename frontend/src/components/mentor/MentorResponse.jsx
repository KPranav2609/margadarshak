import SkeletonCard from "../SkeletonCard";
import styles from "./MentorResponse.module.css";

const MentorResponse = ({ loading, response, parsed }) => {
  return (
    <div className={styles.wrapper}>
      {!loading && !response && (
        <div className={styles.welcome}>
          👋 Welcome!
          <br />
          <br />
          Ask me anything about coding,
          interviews,
          aptitude or placement preparation.
        </div>
      )}

      {loading && (
        <>
          <SkeletonCard className="h-24 w-full" />
          <SkeletonCard className="h-24 w-5/6 mt-3" />
          <SkeletonCard className="h-20 w-4/6 mt-3" />
        </>
      )}

      {!loading && response && (
        <>
          {[parsed.step1, parsed.step2, parsed.step3].map(
            (step, index) =>
              step && (
                <div
                  key={index}
                  className={styles.card}
                >
                  <h3 className={styles.stepTitle}>
                    Step {index + 1}
                  </h3>

                  <p className={styles.text}>
                    {step}
                  </p>
                </div>
              )
          )}

          {parsed.tips && (
            <div className={styles.tipCard}>
              <h3 className={styles.tipTitle}>
                💡 Tips
              </h3>

              <p className={styles.text}>
                {parsed.tips}
              </p>
            </div>
          )}

          {!parsed.step1 &&
            !parsed.step2 &&
            !parsed.step3 &&
            !parsed.tips && (
              <div className={styles.card}>
                <p className={styles.text}>
                  {response}
                </p>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default MentorResponse;