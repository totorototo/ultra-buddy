import { atom } from "recoil";

const currentLocation = atom({
  key: "current-location",
  default: null,
});

export default currentLocation;
