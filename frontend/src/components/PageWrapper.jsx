import { ui } from "../styles/ui";

const PageWrapper = ({ children }) => {
  return (
    <div className={ui.page}>
      {/* Background Glow */}
      <div className={ui.pageGlow}>
        <div className={ui.glowLeft} />
        <div className={ui.glowRight} />
      </div>

      {/* Page Content */}
      <div className={ui.pageContent}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;