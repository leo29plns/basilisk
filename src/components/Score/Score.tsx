import styles from './Score.module.css';

export const Score = ({ score }: {score: number}) => {
  return <div className={styles.score} key={score}>{score}</div>;
};
