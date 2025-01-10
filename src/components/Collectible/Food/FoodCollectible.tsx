import { TCollectibleComponent } from '../../../types/TCollectibleComponent';
import styles from './FoodCollectible.module.css';

export const FoodCollectible: React.FC<TCollectibleComponent> = ({ x, y, radius }) => (
  <circle cx={x} cy={y} r={radius} className={styles.foodCollectible} />
);
