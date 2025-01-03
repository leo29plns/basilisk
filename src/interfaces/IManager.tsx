import { type ReactNode } from 'react';
import { TCollider } from '../types/TCollider';
import { SnakeManager } from '../components/Snake/SnakeManager';

export interface IManager {
  getColliders(): TCollider[];
  setExistingColliders(colliders: TCollider[]): IManager;
  setRenderFn(renderFn: (collectibles: ReactNode[]) => void): IManager;
  setSnakeManager(snakeManager: SnakeManager): IManager;
}
