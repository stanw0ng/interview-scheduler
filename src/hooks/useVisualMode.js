import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    if (!replace) {
      setMode(nextMode);
      setHistory(prev => ([...prev, nextMode]));
    } else {
      setMode(nextMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;