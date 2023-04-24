import { useState } from 'react'

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // replace argument accounts for non-linear transitions like erros
  const transition = (nextMode, replace = false) => {
    if(!replace) {
      setMode(nextMode);
      setHistory(prev => ([...prev, nextMode]));
    } else {
      setMode(nextMode);
    }
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }


  return { mode, transition, back };
};

export default useVisualMode;