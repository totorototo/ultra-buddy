// reminder: location=[longitude, latitude]

const computeDistanceBetweenLocations = (origin, destination) => {
  const R = 6371e3; // metres
  const φ1 = (origin[1] * Math.PI) / 180;
  const φ2 = (destination[1] * Math.PI) / 180;
  const Δφ = ((destination[1] - origin[1]) * Math.PI) / 180;
  const Δλ = ((destination[0] - origin[0]) * Math.PI) / 180;

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
            computeDistanceBetweenLocations(location, array[index + 1])
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
          elevations.push(averageElevationGain);
          return elevations;
        }
        elevations.push(elevation);
        return elevations;
      },
      []
    );
    return smoothedElevations.reduce(
      (elevationGain, elevation, index, values) => {
        if (values[index + 1]) {
          const Δφ = values[index + 1] - elevation;
          if (Δφ > 0) {
            elevationGain.positive = elevationGain.positive + Δφ;
          } else {
            elevationGain.negative = elevationGain.negative + Math.abs(Δφ);
          }
          return elevationGain;
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
        if (index > 0) {
          const distance = computeDistanceBetweenLocations(
            array[index - 1],
            location
          );
          accu.distance += distance;
          accu.map.push([index, accu.distance]);
          return accu;
        } else {
          accu.distance = 0;
          accu.map.push([index, 0]);
          return accu;
        }
      },
      { distance: 0, map: [] }
    );

  const findClosestIndex = (map, distance) => {
    return map.reduce((accu, item) => {
      if (accu === null) return item;
      if (Math.abs(distance - item[1]) > Math.abs(distance - accu[1])) {
        return accu;
      }
      return item;
    })[0];
  };

  const getLocationAt = (...distances) =>
    getLocationIndexAt(...distances).map((index) => locations[index]);

  const getLocationIndexAt = (...distances) => {
    const enhancedLocations = mapLocationToDistance();
    return distances.map((distance) => {
      return findClosestIndex(enhancedLocations.map, distance);
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
            if (treshold > 250) {
              accu.peaks.push(peak);
              accu.lastPeakIndex = index;
            }
            return accu;
          }
        }
        return accu;
      },
      {
        peaks: [],
        lastPeakIndex: 0,
      }
    );

  const splitTrace = (start = 0, end = 0) => {
    const locationsIndices = getLocationIndexAt(start, end);
    const splitTrace = locations.slice(
      locationsIndices[0],
      locationsIndices[1]
    );

    return splitTrace;
  };

  const findClosestLocation = (currentLocation) => {
    if (locations.length === 0) return;
    const closestLocation = locations.reduce(
      (accu, location) => {
        const distance = computeDistanceBetweenLocations(
          location,
          currentLocation
        );

        if (distance < accu.distance) {
          accu.distance = distance;
          accu.location = location;
        }
        return accu;
      },
      {
        location: locations[0],
        distance: computeDistanceBetweenLocations(
          currentLocation,
          locations[0]
        ),
      }
    );
    return closestLocation.location;
  };

  return {
    computeDistance,
    computeElevation,
    computeRegion,
    getLocationAt,
    getLocationIndexAt,
    getPeaksLocations,
    splitTrace,
    findClosestLocation,
  };
};

export default trace;
