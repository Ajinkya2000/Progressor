import styles from "./utils.module.css";

const LoadingScreen = ({ platform, authForm }) => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.container}>
          <div className={styles.top}></div>
          <div className={styles.innerOval}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>
        </div>
      </div>
      {authForm ? (
        <p className={`${styles.loadingText} ${styles.authText}`}>
          Checking your Authentication Status...
        </p>
      ) : (
        <p className={styles.loadingText}>
          Loading your data, scraping{" "}
          {platform === "leetcode" ? "Leetcode" : "Geeks for Geeks"} website
        </p>
      )}
    </>
  );
};

export default LoadingScreen;
