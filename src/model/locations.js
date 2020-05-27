import { atom } from "recoil";

const locations = atom({
  key: "locations",
  default: [],
});

export default locations;
