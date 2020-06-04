import { atom } from "recoil";

const currentLocationIndex = atom({
  key: "current-location-index",
  default: -1,
});

export default currentLocationIndex;
