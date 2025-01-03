import styles from './FoodCollectible.module.css';

interface IFoodPoint {
  x: number;
  y: number;
}

export const FoodCollectible = ({ x, y }: IFoodPoint) => (
  <circle cx={x} cy={y} r="10" fill="green" className={styles.foodCollectible} />
);
