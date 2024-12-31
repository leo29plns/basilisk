import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useTicker } from '../../hooks/useTicker';
import styles from './Snake.module.css';

export interface SnakeProps {
  length: number;
  speed: number;
  circleRadius?: number;
  circleSpacing?: number;
}

export const Snake = ({ length, speed, circleRadius = 16, circleSpacing = 8 }: SnakeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const bufferRef = useRef<{ x: number; y: number }[]>([{ x: circleRadius + 8, y: circleRadius + 8 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });

  const renderSnake = useCallback(() => {
    const svg = d3.select(svgRef.current);

    const segmentPositions: { x: number; y: number }[] = [];

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

    const circles = svg.selectAll('circle').data(segmentPositions.reverse());

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
  }, [length, circleRadius, circleSpacing]);

  // Plugin the ticker, render the snake
  useTicker((_time, deltaTime) => {
    const distance = speed * deltaTime * 0.001;

    const head = bufferRef.current[0];
    const newHead = {
      x: head.x + direction.x * distance,
      y: head.y + direction.y * distance,
    };

    bufferRef.current.unshift(newHead);

    const maxLength = length * circleSpacing;
    while (bufferRef.current.length > maxLength) {
      bufferRef.current.pop();
    }

    renderSnake();
  });

  const handleMouseMove = (event: MouseEvent) => {
    const head = bufferRef.current[0];
    if (!head) return;

    const dx = event.clientX - head.x;
    const dy = event.clientY - head.y;
    const angle = Math.atan2(dy, dx);

    setDirection({
      x: Math.cos(angle),
      y: Math.sin(angle),
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <g ref={svgRef} className={styles.snake}></g>;
};
