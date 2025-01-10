import { ScoreManager } from '../../../utils/scoreManager';
import { Button } from '../../Button/Button';
import styles from './YouLooseScreen.module.css';

export const YouLooseScreen = ({ score, message, then }: {score: number, message?: JSX.Element, then: () => void}) => {
  const scoreManager = new ScoreManager(score);

  return (
    <div className={styles.youloose}>
      <div className={styles.centered}>
        <h1>
          {message ? message : <>Lol, <br />you're so bad, <br />haha, <br />I can't even.</>}
        </h1>
        <div className={styles.score}>
          <div>{score} point{score > 1 ? 's' : ''}</div>
          <div className={styles.bestScore}>Best : {scoreManager.getBestScore()}, worst : {scoreManager.getWorstScore()}</div>
        </div>
        <Button text="Start over, even if I'm too bad." onClick={then} />
      </div>
    </div>
  );
};
