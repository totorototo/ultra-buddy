import { atom } from "recoil";

const currentLocation = atom({
  key: "current-location",
  default: [],
  persistence_UNSTABLE: { type: true },
});

export default currentLocation;
