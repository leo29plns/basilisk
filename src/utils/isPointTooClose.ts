import { TPoint } from '../types/TPoint';

export const isPointTooClose = ({
  pointA,
  pointB,
  minDistance = 0,
  radiusA = 1,
  radiusB = 1,
}: {
  pointA: TPoint;
  pointB: TPoint;
  minDistance?: number;
  radiusA?: number;
  radiusB?: number;
}): boolean => {
  const distance = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
  return distance < minDistance + radiusA + radiusB;
};
