import { atom } from "recoil";

const route = atom({
  key: "route",
  default: {},
  persistence_UNSTABLE: { type: true },
});

export default route;
