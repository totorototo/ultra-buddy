import { atom } from "recoil";

const currentSectionIndex = atom({
  key: "current-section-index",
  default: -1,
});

export default currentSectionIndex;
