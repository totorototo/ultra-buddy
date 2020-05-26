import { atom } from "recoil";

const checkpoints = atom({
  key: "checkpoints",
  default: null,
});

export default checkpoints;
