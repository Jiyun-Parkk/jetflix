import { atom } from "recoil";

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
export const MovieId = atom({
	key: "movieId",
	default: "",
});

export const ShowKeyword = atom({
	key: "showKey",
	default: "",
});
