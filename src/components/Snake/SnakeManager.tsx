import { ReactNode } from 'react';
import { Snake } from '../Snake/Snake'; // Importer le composant Snake
import { TCollider } from '../../types/TCollider';

export class SnakeManager {
  private length: number;
  private speed: number;
  private boardRef: React.RefObject<SVGSVGElement>;
  private colliders?: TCollider[];
  private circleRadius: number;
  private circleSpacing: number;
  private renderFn: (snake: ReactNode[]) => void = () => {};

  constructor(
    initialLength: number,
    initialSpeed: number,
    boardRef: React.RefObject<SVGSVGElement>,
    colliders?: TCollider[],
    circleRadius: number = 16,
    circleSpacing: number = 8
  ) {
    this.length = initialLength;
    this.speed = initialSpeed;
    this.boardRef = boardRef;
    this.colliders = colliders;
    this.circleRadius = circleRadius;
    this.circleSpacing = circleSpacing;
  }

  public setRenderFn(renderFn: (snake: ReactNode[]) => void) {
    this.renderFn = renderFn;

    return this;
  }

  public setSnakeLength(length: number) {
    this.length = length;
    this.renderFn(this.getSnake());

    return this;
  }

  public setColliders(colliders: TCollider[]) {
    this.colliders = colliders;
    this.renderFn(this.getSnake());

    return this;
  }

  public increaseSnakeLength(increment: number) {
    this.length += increment;
    this.renderFn(this.getSnake());

    return this;
  }

  public getSnake(): ReactNode[] {
    return [
      <Snake
        key="snake"
        length={this.length}
        speed={this.speed}
        boardRef={this.boardRef}
        colliders={this.colliders}
        circleRadius={this.circleRadius}
        circleSpacing={this.circleSpacing}
      />
    ];
  }

  public setSpeed(speed: number) {
    this.speed = speed;
    this.renderFn(this.getSnake());

    return this;
  }
}
