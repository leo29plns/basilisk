import { ReactNode } from 'react';
import { IManager } from '../../../interfaces/IManager';
import { TCollider } from '../../../types/TCollider';
import { TPoint } from '../../../types/TPoint';
import { randomPoints } from '../../../utils/randomPoints';
import { SnakeManager } from '../../Snake/SnakeManager';
import { FoodCollectible } from './FoodCollectible';

export class FoodManager implements IManager {
  private existingColliders: TCollider[] = [];
  private foodPoints: TPoint[] = [];
  private renderFn: (collectibles: ReactNode[]) => void = () => {};
  private snakeManager: SnakeManager | null = null;

  constructor() {
    this.generateFoodPoints();
  }

  public setSnakeManager(snakeManager: SnakeManager) {
    this.snakeManager = snakeManager;

    return this;
  }

  public setExistingColliders(colliders: TCollider[]) {
    this.existingColliders = colliders;
    console.log('Updated colliders:', colliders);

    return this;
  }

  public callBackFn = (consumedPoint: TPoint) => {
    if (this.removeFood(consumedPoint) && this.snakeManager) {
      this.snakeManager.increaseSnakeLength(1);
    } else {
      return
    }

    console.log(`Food consumed at point: x=${consumedPoint.x}, y=${consumedPoint.y}`);

    this.renderFn(this.getCollectibles());
  };

  public setRenderFn = (renderFn: (collectibles: ReactNode[]) => void) => {
    this.renderFn = renderFn;
    renderFn(this.getCollectibles());

    return this;
  };

  public getCollectibles(): ReactNode[] {
    return ([
      <g key="food">
        {this.foodPoints.map((point, index) => (
          <FoodCollectible x={point.x} y={point.y} key={index} />
        ))}
      </g>
    ]);
  }

  public getColliders(): TCollider[] {
    return this.foodPoints.map((point) => ({
      callBackFn: this.callBackFn,
      points: [point],
      radius: 10
    }));
  }

  private generateFoodPoints() {
    const boardWidth = 100;
    const boardHeight = 100;
    const minDistance = 0;
    const count = 10; // Nombre de points à générer
    const radius = 10;

    const newFoodPoints = randomPoints({
      colliders: this.existingColliders, 
      minDistance,
      areaWidth: boardWidth,
      areaHeight: boardHeight,
      count,
      radius,
      origin: { x: 100, y: 100 },
    });

    if (newFoodPoints) {
      this.foodPoints = this.foodPoints.concat(newFoodPoints);
    } else {
      console.warn(`Failed to generate all food points`);
    }
  }

  private removeFood(consumedPoint: TPoint): boolean {
    const toRemove = this.foodPoints.find((point) => point === consumedPoint);
    this.foodPoints = this.foodPoints.filter((point) => point !== consumedPoint);
    console.log(this.foodPoints, `Food removed at point: x=${consumedPoint.x}, y=${consumedPoint.y}`);

    return toRemove !== undefined;
  }
}
