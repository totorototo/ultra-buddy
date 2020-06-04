import { atom } from "recoil";

const checkpoints = atom({
  key: "checkpoints",
  default: [],
});

export default checkpoints;
