import { useState, useEffect } from "react";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";
import { useGetQuiz } from "../../hooks/useQuizes";

interface Variant {
  id: number;
  text: string;
  isTrue: boolean;
}

interface Quiz {
  id: number;
  text: string;
  variants: Variant[];
}

const Quiz = () => {
        const navigate = useNavigate();
        const { data: quizResponse, isLoading, error } = useGetQuiz();

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);

  const quizzes: Quiz[] = quizResponse?.data || [];

  useEffect(() => {
    if (quizzes.length > 0 && shuffledQuizzes.length === 0) {
      const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
      setShuffledQuizzes(shuffled);
      setStartTime(new Date());
    }
  }, [quizzes, shuffledQuizzes]);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !finished) {
      setFinished(true);
      setEndTime(new Date());
    }
  }, [timeLeft, finished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCompletionTime = () => {
    if (!startTime || !endTime) return '';
    const diff = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}m ${secs}s`;
  };

  const handleAnswer = (variantId: number) => {
    const currentQuiz = shuffledQuizzes[current];
    const selectedVariant = currentQuiz.variants.find(v => v.id === variantId);
    
    if (selectedVariant?.isTrue) {
      setScore(score + 1);
    }
    
    const next = current + 1;
    if (next < shuffledQuizzes.length) {
      setCurrent(next);
    } else {
      setFinished(true);
      setEndTime(new Date());
    }
  };

  if (isLoading) {
    return (
      <div className={styles['quiz-container']}>
        <div className={styles['loading']}>Loading quizzes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['quiz-container']}>
        <div className={styles['error']}>Error loading quizzes: {error.message}</div>
        <button className={styles['quiz-exit']} onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (shuffledQuizzes.length === 0) {
    return (
      <div className={styles['quiz-container']}>
        <div className={styles['no-quizzes']}>No quizzes available</div>
        <button className={styles['quiz-exit']} onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className={styles['quiz-container']}>
      {!finished ? (
        <>
          <div className={styles['timer']}>Time: {formatTime(timeLeft)}</div>
          <h2 className={styles['quiz-question']}>{shuffledQuizzes[current].text}</h2>
          <div className={styles['quiz-options']}>
            {shuffledQuizzes[current].variants.map((variant) => (
              <button
                key={variant.id}
                className={styles['quiz-option']}
                onClick={() => handleAnswer(variant.id)}
              >
                {variant.text}
              </button>
            ))}
          </div>
          <p className={styles['quiz-progress']}>
            Question {current + 1} of {shuffledQuizzes.length}
          </p>
        </>
      ) : (
        <>
          <h2 className={styles['quiz-result']}>Your Score: {score}/{shuffledQuizzes.length}</h2>
          <p className={styles['quiz-percentage']}>
            Percentage: {Math.round((score / shuffledQuizzes.length) * 100)}%
          </p>
          <p className={styles['quiz-time']}>
            Completion Time: {getCompletionTime()}
          </p>
          <div className={styles['quiz-actions']}>
            <button className={styles['quiz-restart']} onClick={() => {
              setCurrent(0);
              setScore(0);
              setFinished(false);
              setTimeLeft(600);
              setStartTime(null);
              setEndTime(null);
              setShuffledQuizzes([]);
            }}>Restart Quiz</button>
            <button className={styles['quiz-exit']} onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
