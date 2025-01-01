import { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { useTicker } from '../../hooks/useTicker';
import styles from './Snake.module.css';
import { TPoint } from '../../types/TPoint';
import { TCollider } from '../../types/TCollider';

export interface ISnake {
  length: number;
  speed: number;
  boardRef: React.RefObject<SVGSVGElement>;
  colliders?: TCollider[];
  circleRadius?: number;
  circleSpacing?: number;
}

export const Snake = ({ length, speed, boardRef, colliders, circleRadius = 16, circleSpacing = 8 }: ISnake) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const bufferRef = useRef<TPoint[]>([{ x: circleRadius + 8, y: circleRadius + 8 }]);
  const directionRef = useRef({ x: 1, y: 0 });

  const isPointColliding = useCallback(({
    head,
    point,
    radius = 1,
    tolerance = 0,
  }: {
    head: TPoint;
    point: TPoint;
    radius?: number;
    tolerance?: number;
  }): boolean => {
    const distance = Math.hypot(head.x - point.x, head.y - point.y);
    return Math.ceil(distance) - circleRadius < radius - tolerance;
  }, [circleRadius]);  

  const isSelfColliding = useCallback((
      head: TPoint,
      segments: TPoint[],
      offset: number,
      circleRadius: number
    ): boolean => {
    for (let i = offset; i < segments.length; i++) {
      const collides = isPointColliding({
        head,
        point: segments[i],
        radius: circleRadius,
        tolerance: circleRadius
      });
      if (collides) return true;
    }
  
    return false;
  }, [isPointColliding]);

  const determineSelfCollidingOffset = useCallback((): number => {
    const minDistance = Math.max(2 * circleRadius, circleSpacing);
    return Math.ceil(minDistance / circleSpacing);
  }, [circleRadius, circleSpacing]);

  const isOutOfBoard = useCallback((head: TPoint): boolean => {
    const board = boardRef.current?.getBoundingClientRect();
    if (!board) return false;

    return (
      head.x - circleRadius < board.left ||
      head.x + circleRadius > board.right ||
      head.y - circleRadius < board.top ||
      head.y + circleRadius > board.bottom
    );
  }, [boardRef, circleRadius]);
  
  const doCollides = useCallback(({
    head,
    segments,
  }: {
    head: TPoint;
    segments: TPoint[]
  }): null | TPoint => {
    if (isSelfColliding(head, segments, determineSelfCollidingOffset(), circleRadius)) {
      console.log('Self collision');
      return head;
    }

    if (isOutOfBoard(head)) {
      console.log('Out of board');
      return head;
    }

    if (!colliders) return null;

    // checks every collider
    for (const collider of colliders) {
      for (const point of collider.points) {
        if (isPointColliding({head, point, radius: collider.radius})) {
          collider.callBackFn(point);
          return point;
        }
      }
    }
  
    return null;
  }, [colliders, isPointColliding, isSelfColliding, determineSelfCollidingOffset, circleRadius, isOutOfBoard]);

  const renderSnake = useCallback((): TPoint[] => {
    const svg = d3.select(svgRef.current);

    const segmentPositions: TPoint[] = [];

    let accumulatedDistance = 0;
    let currentIndex = 0;

    // For every circle
    for (let i = 0; i < length; i++) {
      const targetDistance = i * circleSpacing;

      if (i === 0) {
        const head = bufferRef.current[0];
        segmentPositions.push({ x: head.x, y: head.y });
        continue;
      }

      while (
        currentIndex < bufferRef.current.length - 1 &&
        accumulatedDistance < targetDistance
      ) {
        const curr = bufferRef.current[currentIndex];
        const next = bufferRef.current[currentIndex + 1];
        const segmentDistance = Math.hypot(next.x - curr.x, next.y - curr.y);

        if (accumulatedDistance + segmentDistance >= targetDistance) {
          const t =
            (targetDistance - accumulatedDistance) / segmentDistance;
          const x = curr.x + t * (next.x - curr.x);
          const y = curr.y + t * (next.y - curr.y);

          segmentPositions.push({ x, y });
          break;
        }

        accumulatedDistance += segmentDistance;
        currentIndex++;
      }
    }

    const circles = svg.selectAll('circle').data([...segmentPositions].reverse());

    circles
      .join(
        enter =>
          enter
            .append('circle')
            .attr('r', circleRadius),
        update => update,
        exit => exit.remove()
      )
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

      return segmentPositions;
  }, [length, circleRadius, circleSpacing]);

  // Plugin the ticker, render the snake
  useTicker((_time, deltaTime) => {
    const distance = speed * deltaTime * 0.001;

    const head = bufferRef.current[0];
    const newHead = {
      x: head.x + directionRef.current.x * distance,
      y: head.y + directionRef.current.y * distance,
    };

    bufferRef.current.unshift(newHead);

    const maxLength = length * circleSpacing;
    while (bufferRef.current.length > maxLength) {
      bufferRef.current.pop();
    }

    const segments = renderSnake();
    const collisionPoint = doCollides({head: newHead, segments});

    if (collisionPoint) console.log('collisionPoint', collisionPoint);
  });

  const handleMouseMove = (event: MouseEvent) => {
    const head = bufferRef.current[0];
    if (!head) return;

    const dx = event.clientX - head.x;
    const dy = event.clientY - head.y;
    const angle = Math.atan2(dy, dx);

    directionRef.current = { x: Math.cos(angle), y: Math.sin(angle) };
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <g ref={svgRef} className={styles.snake}></g>;
};
