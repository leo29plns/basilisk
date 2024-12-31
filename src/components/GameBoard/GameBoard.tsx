import { useEffect, useState } from 'react';
import { Snake } from '../Snake/Snake';
import styles from './GameBoard.module.css';

export interface GameBoardProps {
  width: number;
  height: number;
}

export const GameBoard = ({ width, height }: GameBoardProps) => {
  const [length, setLength] = useState(5);
  const [speed, setSpeed] = useState(100);

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
    <svg width={width} height={height} className={styles.board}>
      <Snake length={length} speed={speed} />
    </svg>
  );
};
