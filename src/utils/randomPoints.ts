import { TPoint } from '../types/TPoint';
import { isPointTooCloseToColliders } from './isPointTooCloseToColliders';
import { isPointTooCloseToPoint } from './isPointTooCloseToPoint'; // Importation de la nouvelle fonction
import { TCollider } from '../types/TCollider';

export const randomPoints = ({
  colliders,
  minDistance,
  areaWidth,
  areaHeight,
  count,
  radius = 1,
  origin = { x: 0, y: 0 },
  maxAttempts = 100,
}: {
  colliders: TCollider[];
  minDistance: number;
  areaWidth: number;
  areaHeight: number;
  count: number;
  radius?: number;
  origin?: TPoint;
  maxAttempts?: number;
}): TPoint[] => {
  const points: TPoint[] = [];
  let attempts = 0;

  while (points.length < count && attempts < maxAttempts) {
    const newPoint: TPoint = {
      x: Math.random() * (areaWidth - 2 * radius) + radius + origin.x,
      y: Math.random() * (areaHeight - 2 * radius) + radius + origin.y,
    };

    const isTooCloseToExistingPoints = points.some((existingPoint) => 
      isPointTooCloseToPoint({
        pointA: newPoint,
        pointB: existingPoint,
        minDistance,
        radiusA: radius,
        radiusB: radius
      })
    );

    const isTooCloseToColliders = isPointTooCloseToColliders({
      newPoint,
      colliders,
      minDistance,
      newPointRadius: radius
    });

    if (!isTooCloseToExistingPoints && !isTooCloseToColliders) {
      points.push(newPoint);
    } else {
      attempts++;
    }
  }

  if (points.length < count) {
    console.warn(
      `Failed to generate ${count - points.length} points after ${maxAttempts} attempts.`
    );
  }

  return points;
};
