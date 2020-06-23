import { atom } from "recoil";

const domain = atom({
  key: "domain",
  default: { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
  persistence_UNSTABLE: { type: true },
});

export default domain;
