import { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';

const App = () => {
  const [board, setBoard] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setBoard({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <GameBoard width={board.width} height={board.height} />
    </>
  );
};

export default App;
