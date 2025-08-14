import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
        const navigate = useNavigate()


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>IELTS Mock Exam</h1>
        <p className={styles.subtitle}>
          Test your English skills with our comprehensive IELTS practice platform
        </p>

        <button className={styles['start-btn']} onClick={() => navigate('/quiz')}>▶ Start Quiz</button>
        <button className={styles['admin-btn']} onClick={() => navigate('/admin')}>⚙ Admin Panel</button>

        <div className={styles['features']}>
          <div className={styles.feature}>
            <span className={styles.icon}>⏱</span>
            <p>10 Minute Timer</p>
          </div>
          <div className={styles.feature}>
            <span className="icon">🎯</span>
            <p>Random Questions</p>
          </div>
          <div className={styles.feature}>
            <span className="icon">📊</span>
            <p>Instant Results</p>
          </div>
          <div className={styles.feature}>
            <span className="icon">📝</span>
            <p>Multiple Choice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
