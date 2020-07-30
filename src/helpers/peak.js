import { max, scan, mean, range, pairs, min, deviation } from "d3-array";

// see https://observablehq.com/@yurivish/peak-detection for explanations!
const detectPeaks = (
  data,
  accessor,
  options = {
    lookaround: 2,
    sensitivity: 1.4,
    coalesce: 0,
    full: false,
  }
) => {
  const values = typeof accessor === "function" ? data.map(accessor) : data;

  // Compute a peakiness score for every sample value in `data`
  // We normalize the scale of the scores by mean-centering and dividing by the standard deviation
  // to get a dimensionless quantity such that can be used as a sensitivity parameter
  // across different scales of data (s. t. normalize(x) == normalize(k*x))

  const scores = normalize(
    values.map((value, index) =>
      peakiness(
        values.slice(Math.max(0, index - options.lookaround), index),
        value,
        values.slice(index + 1, index + options.lookaround + 1)
      )
    )
  );

  // Candidate peaks are indices whose score is above the sensitivity threshold
  const candidates = range(scores.length).filter(
    (index) => scores[index] > options.sensitivity
  );

  // If we have multiple peaks, coalesce those that are close together
  const groups = candidates.length ? [[candidates[0]]] : [];
  pairs(candidates).forEach(([a, b]) => {
    if (b - a < options.coalesce) {
      groups[groups.length - 1].push(b);
    } else {
      groups.push([b]);
    }
  });

  // Represent every group of peaks by the highest peak in the group
  const peaks = groups.map(
    (group) => group[scan(group, (a, b) => values[b] - values[a])]
  );

  return options.full
    ? { data, values, scores, candidates, groups, peaks }
    : peaks;
};

const peakiness = (left, value, right) => {
  // assume zero outside the boundary

  return value - max([min(left) || 0, min(right) || 0]); // this can be max or mean.
};

const normalize = (xs) => {
  const meanb = mean(xs);
  const stdev = deviation(xs);
  return xs.map((x) => (x - meanb) / stdev);
};

export default detectPeaks;
