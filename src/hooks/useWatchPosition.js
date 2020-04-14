import { useEffect, useState } from "react";

const useWatchPosition = ({
  enableHighAccuracy = true,
  timeout = Infinity,
  maximumAge = 0,
} = {}) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(setPosition, setError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    return () => navigator.geolocation.clearWatch(id);
  }, [enableHighAccuracy, timeout, maximumAge]);

  return [position, error];
};

export default useWatchPosition;
