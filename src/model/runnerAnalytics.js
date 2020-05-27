import { atom } from "recoil";

const runnerAnalytics = atom({
  key: "runner-analytics",
  default: [],
});

export default runnerAnalytics;
