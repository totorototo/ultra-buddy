import { atom } from "recoil";

const sections = atom({
  key: "sections",
  default: null,
  persistence_UNSTABLE: { type: true },
});

export default sections;
