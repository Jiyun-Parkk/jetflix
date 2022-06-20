import { atom, selector } from "recoil";

export const windowSize = atom({
	key: "windowSize",
	default: window.innerWidth,
});

export const Index = atom({
	key: "index",
	default: 0,
});

export const IsLeaving = atom({
	key: "leaving",
	default: false,
});
