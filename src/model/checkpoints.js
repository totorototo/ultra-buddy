import { atom } from "recoil";

const checkpoints = atom({
  key: "checkpoints",
  default: [],
  persistence_UNSTABLE: { type: true },
});

export default checkpoints;
