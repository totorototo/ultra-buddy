import { atom } from "recoil";

const runnerLocations = atom({
    key: "runner-locations",
    default: [],
    persistence_UNSTABLE: { type: true },
});

export default runnerLocations;
