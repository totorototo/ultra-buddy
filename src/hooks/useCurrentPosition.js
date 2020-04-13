import { useEffect, useState } from "react";

const useCurrentPosition = ({
  enableHighAccuracy = true,
  timeout = 20000,
  maximumAge = 1000,
} = {}) => {
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position);
      },
      (error) => {
        setError(error);
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );
  });

  return [position, error];
};

export default useCurrentPosition;
