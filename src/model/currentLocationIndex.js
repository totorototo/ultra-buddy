import { atom } from "recoil";

const currentLocationIndex = atom({
  key: "current-location-index",
  default: -1,
  persistence_UNSTABLE: { type: true },
});

export default currentLocationIndex;
