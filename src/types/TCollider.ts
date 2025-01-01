import { TPoint } from "./TPoint";

export type TCollider = {
  callBackFn: (point: TPoint) => void;
  points: TPoint[];
  radius: number;
};