import { atom, selector } from "recoil";

export const windowSize = atom({
	key: "windowSize",
	default: window.innerWidth,
});
