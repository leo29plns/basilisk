import { TCollectible } from '../../../types/TCollectible';
import { FoodManager } from './FoodManager';

export class FoodUltraManager extends FoodManager {
  constructor(
    protected addCollectible: (collectible: TCollectible) => void,
    protected removeCollectible: (collectible: TCollectible) => void,
    protected modifySnakeLength: (modifySnakeLength: number) => void,
    protected modifySnakeSpeed: (modifySnakeSpeed: number) => void,
    protected modifyScore: (modifyScore: number) => void,
    

    protected readonly size: number = 20
  ) {
    super(addCollectible, removeCollectible, modifySnakeLength, modifySnakeSpeed, modifyScore);
    this.generateFoodPoints({count: 3, radius: this.size});
  }

  public doCollide = (collidedCollectible: TCollectible) => {
    this.removeCollectible(collidedCollectible);
    this.modifySnakeLength(+3);
    this.modifySnakeSpeed(+5);
    this.modifyScore(+5);
    this.generateFoodPoints({count: 1, radius: this.size});

    console.log(`FoodUltra consumed at point: x=${collidedCollectible.point.x}, y=${collidedCollectible.point.y}`);
  };
}
