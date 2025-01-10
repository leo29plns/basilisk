import styles from './TrapCollectible.module.css';

interface ITrapPoint {
  x: number;
  y: number;
  radius: number;
}

export const TrapCollectible = ({ x, y, radius }: ITrapPoint) => (
  <circle cx={x} cy={y} r={radius} className={styles.trapCollectible} />
);
