import { atom } from "recoil";

const name = atom({
  key: "name",
  default: null,
});

export default name;
