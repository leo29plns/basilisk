import { TPoint } from "./TPoint";

export type TCollectible = {
  doCollide: (collectible: TCollectible) => void;
  point: TPoint;
  radius: number;
  component: JSX.Element;
};