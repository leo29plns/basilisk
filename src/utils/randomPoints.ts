import { TPoint } from '../types/TPoint';
import { isPointTooClose } from './isPointTooClose'; // Importation de la nouvelle fonction
import { TCollectible } from '../types/TCollectible';

export const randomPoints = ({
  collectibles,
  minDistance,
  areaWidth,
  areaHeight,
  count,
  radius = 1,
  origin = { x: 0, y: 0 },
  maxAttempts = 100,
}: {
  collectibles: TCollectible[];
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
      isPointTooClose({
        pointA: newPoint,
        pointB: existingPoint,
        minDistance,
        radiusA: radius,
        radiusB: radius
      })
    );

    const isTooCloseToCollectibles = collectibles.some((collectible) => 
      isPointTooClose({
        pointA: newPoint,
        pointB: collectible.point,
        minDistance,
        radiusA: radius,
        radiusB: collectible.radius
      })
    );

    if (!isTooCloseToExistingPoints && !isTooCloseToCollectibles) {
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
