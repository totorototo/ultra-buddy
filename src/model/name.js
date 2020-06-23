import { atom } from "recoil";

const name = atom({
  key: "name",
  default: "",
  persistence_UNSTABLE: { type: true },
});

export default name;
