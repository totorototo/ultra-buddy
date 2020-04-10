import { useState, useEffect } from "react";

const usePresistedState = (key, defaultValue) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (exception) {
      alert(exception);
    }
  }, [key, state]);

  return [state, setState];
};

export default usePresistedState;
