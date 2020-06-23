import { atom } from "recoil";

const currentSectionIndex = atom({
  key: "current-section-index",
  default: -1,
  persistence_UNSTABLE: { type: true },
});

export default currentSectionIndex;
