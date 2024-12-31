import { useEffect } from 'react';
import gsap from 'gsap';

type TickerCallback = (time: number, deltaTime: number, frame: number, elapsed: number) => void;

export const useTicker = (callback: TickerCallback) => {
  useEffect(() => {
    const ticker = gsap.ticker.add(callback);

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, [callback]);
};
