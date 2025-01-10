import { TCollectible } from '../../../types/TCollectible';
import { randomPoints } from '../../../utils/randomPoints';
import { TrapCollectible } from './TrapCollectible';

export class TrapManager {
  constructor(
    protected addCollectible: (collectible: TCollectible) => void,
    protected removeCollectible: (collectible: TCollectible) => void,
    protected modifySnakeLength: (modifySnakeLength: number) => void,
    protected modifySnakeSpeed: (modifySnakeSpeed: number) => void,
    protected modifyScore: (modifyScore: number) => void
  ) {
    this.generateTrapPoints({count: 10});
  }

  public doCollide = (collidedCollectible: TCollectible) => {
    this.removeCollectible(collidedCollectible);
    this.modifySnakeLength(-2);
    this.modifySnakeSpeed(-10);
    this.modifyScore(-3);
    this.generateTrapPoints({count: 5});

    console.log(`Trap consumed at point: x=${collidedCollectible.point.x}, y=${collidedCollectible.point.y}`);
  };

  public generateTrapPoints({count}: {count: number}) {
    const minDistance = 0;
    const radius = 10;

    const newTrapPoints = randomPoints({
      collectibles: window.collectibles, 
      minDistance,
      areaWidth: window.boardSize.width,
      areaHeight: window.boardSize.height,
      count,
      radius
    });

    if (newTrapPoints) {
      newTrapPoints.map((point) => {
        this.addCollectible({
          doCollide: this.doCollide,
          point,
          radius,
          component: <TrapCollectible x={point.x} y={point.y} radius={radius} key={`${point.x}-${point.y}`} />,
        });
      });
    } else {
      console.warn(`Failed to generate all trap points`);
    }
  }
}
