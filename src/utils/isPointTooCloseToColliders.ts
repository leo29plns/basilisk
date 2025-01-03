import { TPoint } from '../types/TPoint';
import { TCollider } from '../types/TCollider';
import { isPointTooCloseToPoint } from './isPointTooCloseToPoint'; // Importation de la nouvelle fonction

export const isPointTooCloseToColliders = ({
  newPoint,
  colliders,
  minDistance = 0,
  newPointRadius = 1,
}: {
  newPoint: TPoint;
  colliders: TCollider[];
  minDistance?: number;
  newPointRadius?: number;
}): boolean => {
  for (const collider of colliders) {
    for (const point of collider.points) {
      const existingPointRadius = collider.radius;
      
      if (isPointTooCloseToPoint({
        pointA: newPoint,
        pointB: point,
        minDistance,
        radiusA: newPointRadius,
        radiusB: existingPointRadius
      })) {
        return true;
      }
    }
  }
  return false;
};
