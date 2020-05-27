import { atom } from "recoil";

const name = atom({
  key: "name",
  default: "",
});

export default name;
