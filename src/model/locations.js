import { atom } from "recoil";

const locations = atom({
  key: "locations",
  default: [],
  persistence_UNSTABLE: { type: true },
});

export default locations;
