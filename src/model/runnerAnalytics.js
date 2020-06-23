import { atom } from "recoil";

const runnerAnalytics = atom({
  key: "runner-analytics",
  default: [],
  persistence_UNSTABLE: { type: true },
});

export default runnerAnalytics;
