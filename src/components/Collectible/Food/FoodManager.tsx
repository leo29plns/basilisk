import { TCollectible } from '../../../types/TCollectible';
import { randomPoints } from '../../../utils/randomPoints';
import { FoodCollectible } from './FoodCollectible';

export class FoodManager {
  constructor(
    protected addCollectible: (collectible: TCollectible) => void,
    protected removeCollectible: (collectible: TCollectible) => void,
    protected modifySnakeLength: (modifySnakeLength: number) => void,
    protected modifySnakeSpeed: (modifySnakeSpeed: number) => void,
    protected modifyScore: (modifyScore: number) => void
  ) {
    this.generateFoodPoints({count: 10});
  }

  public doCollide = (collidedCollectible: TCollectible) => {
    this.removeCollectible(collidedCollectible);
    this.modifySnakeLength(+1);
    this.modifySnakeSpeed(+10);
    this.modifyScore(+2);
    this.generateFoodPoints({count: 1});

    console.log(`Food consumed at point: x=${collidedCollectible.point.x}, y=${collidedCollectible.point.y}`);
  };

  public generateFoodPoints({
    count,
    minDistance = 0,
    radius = 10
  }: {
    count: number,
    minDistance?: number,
    radius?: number
  }) {

    const newFoodPoints = randomPoints({
      collectibles: window.collectibles, 
      minDistance,
      areaWidth: window.boardSize.width,
      areaHeight: window.boardSize.height,
      count,
      radius
    });

    if (newFoodPoints) {
      newFoodPoints.map((point) => {
        this.addCollectible({
          doCollide: this.doCollide,
          point,
          radius,
          component: <FoodCollectible x={point.x} y={point.y} radius={radius} key={`${point.x}-${point.y}`} />,
        });
      });
    } else {
      console.warn(`Failed to generate all food points`);
    }
  }
}
