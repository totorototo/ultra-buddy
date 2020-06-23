import { atom } from "recoil";

const routeAnalytics = atom({
  key: "route-analytics",
  default: {},
  persistence_UNSTABLE: { type: true },
});

export default routeAnalytics;
