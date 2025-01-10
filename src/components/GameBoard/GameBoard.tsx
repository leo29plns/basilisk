import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './GameBoard.module.css';
import { Snake } from '../Snake/Snake';
import { TCollectible } from '../../types/TCollectible';
import { FoodManager } from '../Collectible/Food/FoodManager';
import { TSize } from '../../types/TSize';
import { TrapManager } from '../Collectible/Trap/TrapManager';
import { FoodUltraManager } from '../Collectible/Food/FoodUltraManager';
import { Score } from '../Score/Score';
import { YouLooseScreen } from '../Screen/YouLoose/YouLooseScreen';
import gsap from 'gsap';

declare global {
  interface Window {
    collectibles: TCollectible[];
    boardSize: TSize;
  }
}

export interface IGameBoard {
  size: TSize;
}

export const GameBoard = ({ size }: IGameBoard) => {
  const boardRef = useRef<SVGSVGElement>(null);

  window.collectibles = [];
  window.boardSize = size;

  const [snakeLength, setSnakeLength] = useState(10);
  const [snakeSpeed, setSnakeSpeed] = useState(100);
  const [collectibles, setCollectibles] = useState<TCollectible[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameOverMessage = useRef<undefined | JSX.Element>(undefined);

  useEffect(() => {
    window.collectibles = collectibles;
  }, [collectibles]);

  const addCollectible = (collectible: TCollectible) => {
    setCollectibles((prev) => [...prev, collectible]);
  };

  const removeCollectible = (collectible: TCollectible) => {
    setCollectibles((prev) => prev.filter((c) => c !== collectible));
  };

  const modifySnakeLength = (modifySnakeLength: number) => {
    setSnakeLength((prev) => prev + modifySnakeLength);
  };

  const modifySnakeSpeed = (modifySnakeSpeed: number) => {
    setSnakeSpeed((prev) => prev + modifySnakeSpeed);
  };

  const modifyScore = (modifyScore: number) => {
    setScore((prev) => prev + modifyScore);
  };

  const gameOverWithMessage = (message: JSX.Element) => {
    gameOverMessage.current = message;
    setGameOver(true);
  }

  const resetGame = () => {
    // setSnakeLength(10);
    // setSnakeSpeed(100);
    // setCollectibles([]);
    // setScore(0);
    // gameOverMessage.current = undefined;
    // setGameOver(false);
    // gsap.ticker.wake();
    window.location.reload(); // parce que je suis un flemmard
  };

  useEffect(() => {
    if (snakeLength <= 1 && !gameOver) {
      setGameOver(true);
    }
  }, [snakeLength, gameOver]);

  useEffect(() => {
    if (gameOver) {
      gsap.ticker.sleep()
      setSnakeSpeed(0);
    }
  }, [gameOver]);

  useMemo(() => {
    new FoodManager(addCollectible, removeCollectible, modifySnakeLength, modifySnakeSpeed, modifyScore);
    new FoodUltraManager(addCollectible, removeCollectible, modifySnakeLength, modifySnakeSpeed, modifyScore);
    new TrapManager(addCollectible, removeCollectible, modifySnakeLength, modifySnakeSpeed, modifyScore);
  }, []);

  const renderSnake = () => {
    if (gameOver) {
      return null;
    }

    return (
      <Snake
        length={snakeLength}
        speed={snakeSpeed}
        collectibles={collectibles}
        boardRef={boardRef}
        gameOverWithMessage={gameOverWithMessage}
      />
    );
  };

  return (
    <>
      <div className={styles.gui}>
        {gameOver ? <YouLooseScreen score={score} then={resetGame} message={gameOverMessage.current} /> : null}
        <Score score={score} />
      </div>
      <svg width={size.width} height={size.height} className={styles.board} ref={boardRef}>
        {renderSnake()}
        {collectibles.map((collectible) => collectible.component)}
      </svg>
    </>
  );
};
