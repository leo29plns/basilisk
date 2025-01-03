import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { SnakeManager } from '../Snake/SnakeManager'; 
import { IManager } from '../../interfaces/IManager';
import { TCollider } from '../../types/TCollider';
import { FoodManager } from '../Collectible/Food/FoodManager';
import styles from './GameBoard.module.css';

export interface IGameBoard {
  width: number;
  height: number;
}

export const GameBoard = ({ width, height }: IGameBoard) => {
  const boardRef = useRef<SVGSVGElement>(null);
  // const [colliders, setColliders] = useState<TCollider[]>([]);
  // const [collectibles, setCollectibles] = useState<ReactNode[]>([]);

  const snakeManager = useMemo(() => new SnakeManager(5, 100, boardRef), []);

  // // Déclaration des managers (nourriture, etc.)
  // const managers: IManager[] = useMemo(() => [new FoodManager()], []);

  // // Mise en place des managers après le rendu initial
  // useEffect(() => {
  //   // Passer la fonction de rendu (setCollectibles) à SnakeManager
  //   snakeManager.setRenderFn(setCollectibles);

  //   // Passer snakeManager aux autres managers
  //   managers.forEach(manager => {
  //     manager
  //       .setSnakeManager(snakeManager)
  //       .setRenderFn(setCollectibles);
  //   });

  //   // Récupérer et mettre à jour les colliders
  //   const newColliders = managers.flatMap(manager => manager.getColliders());
  //   setColliders(newColliders);

  //   // Passer les colliders existants aux managers
  //   managers.forEach(manager => manager.setExistingColliders(newColliders));
  // }, [managers, snakeManager]);

  // // Mettre à jour les colliders de SnakeManager chaque fois qu'ils changent
  // useEffect(() => {
  //   snakeManager.setColliders(colliders);
  // }, [colliders, snakeManager]);

  return (
    <svg width={width} height={height} className={styles.board} ref={boardRef}>
      {/* {collectibles} */}
      {snakeManager.getSnake()}
    </svg>
  );
};
