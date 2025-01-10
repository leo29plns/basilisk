import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';
import { TSize } from './types/TSize';

const App = () => {
  const [boardSize, setBoardSize] = useState<TSize>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setBoardSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <GameBoard size={boardSize}/>
    </>
  );
};

export default App;
