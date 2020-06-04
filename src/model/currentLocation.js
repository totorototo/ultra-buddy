import { atom } from "recoil";

const currentLocation = atom({
  key: "current-location",
  default: [],
});

export default currentLocation;
