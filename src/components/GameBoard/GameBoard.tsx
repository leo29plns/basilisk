import { useEffect, useRef, useState } from 'react';
import { Snake } from '../Snake/Snake';
import styles from './GameBoard.module.css';

import { TCollider } from '../../types/TCollider';
import { TPoint } from '../../types/TPoint';

export interface IGameBoard {
  width: number;
  height: number;
}

export const GameBoard = ({ width, height }: IGameBoard) => {
  const [length, setLength] = useState(5);
  const [speed, setSpeed] = useState(100);
  const boardRef = useRef<SVGSVGElement>(null);


  const testCollider: TCollider = {
    callBackFn: (point: TPoint) => {
      console.log(`Collision detected at point: x=${point.x}, y=${point.y}`);
    },
    points: [
      { x: 600, y: 700 }, // Point de collision
    ],
    radius: 100, // Rayon de détection (ajustez si nécessaire)
  };


  useEffect(() => {
    const intervalId = setInterval(() => {
      setLength((prevLength) => prevLength + 1);
      setSpeed((prevSpeed) => prevSpeed * 1.01);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <svg width={width} height={height} className={styles.board} ref={boardRef}>
      <Snake
        length={length}
        speed={speed}
        boardRef={boardRef}
        colliders={[testCollider]}
      />
    </svg>
  );
};
