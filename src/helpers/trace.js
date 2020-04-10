const computeDistanceBetweenLocations = (
  origin = { longitude: 0, latitude: 0 },
  destination = { longitude: 0, latitude: 0 }
) => {
  const R = 6371e3; // metres
  const φ1 = (origin.latitude * Math.PI) / 180;
  const φ2 = (destination.latitude * Math.PI) / 180;
  const Δφ = ((destination.latitude - origin.latitude) * Math.PI) / 180;
  const Δλ = ((destination.longitude - origin.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) / 1000;
};

const trace = (...locations) => {
  const computeDistance = () =>
    locations.reduce(
      (distance, location, index, array) =>
        index < array.length - 1
          ? distance +
            computeDistanceBetweenLocations(
              {
                longitude: location[0],
                latitude: location[1],
              },
              {
                longitude: array[index + 1][0],
                latitude: array[index + 1][1],
              }
            )
          : distance,
      0
    );
  const computeElevation = (smoothingFactor = 5) => {
    const elevations = locations.map((location) => location[2]);

    // smooth array values (remove noise).
    const smoothedElevations = elevations.reduce(
      (elevations, elevation, index, values) => {
        if (
          values[index - smoothingFactor] &&
          values[index + smoothingFactor]
        ) {
          const filteredElevations = values.slice(
            index - smoothingFactor,
            index + smoothingFactor
          );
          const elevationGain = filteredElevations.reduce((sum, item) => {
            return sum + item;
          }, 0);

          const averageElevationGain = elevationGain / (smoothingFactor * 2);
          return [...elevations, averageElevationGain];
        }
        return [...elevations, elevation];
      },
      []
    );
    return smoothedElevations.reduce(
      (elevationGain, elevation, index, values) => {
        if (values[index + 1]) {
          const Δφ = values[index + 1] - elevation;
          if (Δφ > 0) {
            return { ...elevationGain, positive: elevationGain.positive + Δφ };
          } else {
            return {
              ...elevationGain,
              negative: elevationGain.negative + Math.abs(Δφ),
            };
          }
        }
        return elevationGain;
      },
      { positive: 0, negative: 0 }
    );
  };

  const computeRegion = () =>
    locations.reduce(
      (region, location) => ({
        minLongitude:
          location[0] < region.minLongitude ? location[0] : region.minLongitude,
        maxLongitude:
          location[0] > region.maxLongitude ? location[0] : region.maxLongitude,
        minLatitude:
          location[1] < region.minLatitude ? location[1] : region.minLatitude,
        maxLatitude:
          location[1] > region.maxLatitude ? location[1] : region.maxLatitude,
      }),
      {
        minLongitude: locations[0][0],
        maxLongitude: locations[0][0],
        minLatitude: locations[0][1],
        maxLatitude: locations[0][1],
      }
    );

  const mapLocationToDistance = () =>
    locations.reduce(
      (accu, location, index, array) => {
        if (index < array.length - 1) {
          const distance = computeDistanceBetweenLocations(
            {
              longitude: location[0],
              latitude: location[1],
            },
            {
              longitude: array[index + 1][0],
              latitude: array[index + 1][1],
            }
          );
          const totalDistance = accu.distance + distance;
          return {
            ...accu,
            distance: totalDistance,
            map: [...accu.map, [index, totalDistance]],
          };
        }
        return accu;
      },
      { distance: 0, map: [] }
    );

  const getLocationAt = (...distances) => {
    const enhancedLocations = mapLocationToDistance();
    return distances.map((distance) => {
      const sortedLocations = enhancedLocations.map.sort(
        (a, b) => Math.abs(distance - a[1]) - Math.abs(distance - b[1])
      );
      return locations[sortedLocations[0][0]];
    });
  };

  const getPeaksLocations = () =>
    locations.reduce(
      (accu, location, index, array) => {
        if (index > 0 && index + 1 < array.length) {
          if (
            (location[2] > array[index - 1][2] &&
              location[2] > array[index + 1][2]) ||
            (location[2] > array[index - 1][2] &&
              location[2] === array[index + 1][2] &&
              array.slice(index).find((item) => item !== location[2]) <
                location[2])
          ) {
            const peak = { index, location };
            const treshold = Math.abs(
              location[2] - array[accu.lastPeakIndex][2]
            );
            return treshold > 250
              ? {
                  ...accu,
                  peaks: [...accu.peaks, peak],
                  lastPeakIndex: index,
                }
              : accu;
          }
        }
        return accu;
      },
      {
        peaks: [],
        lastPeakIndex: 0,
      }
    );

  return {
    computeDistance,
    computeElevation,
    computeRegion,
    getLocationAt,
    getPeaksLocations,
  };
};

export default trace;
